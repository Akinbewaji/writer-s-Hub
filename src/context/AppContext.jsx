import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockData } from '../data/mockData';
import userDatabase from '../utils/userDatabase';

const initialState = {
  currentUser: null,
  stories: [],
  comments: [],
  discussions: [],
  events: [],
  groups: [],
  achievements: [],
  activities: [],
  isAuthenticated: false,
  searchTerm: '',
  selectedCategory: 'all'
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      // If logging in, ensure user database is initialized
      if (action.payload && !userDatabase.getUserProfile(action.payload.id)) {
        userDatabase.initializeUser(action.payload.id, action.payload);
      }
      
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: !!action.payload,
        // Clear user-specific data when signing out
        ...(action.payload === null && {
          bookmarkedStories: [],
          userStories: []
        })
      };

    case 'ADD_STORY':
      // Add to user's personal database
      if (state.currentUser) {
        const userStory = userDatabase.addUserStory(state.currentUser.id, action.payload);
        userDatabase.logActivity(state.currentUser.id, {
          type: 'story_created',
          storyId: userStory.id,
          storyTitle: userStory.title
        });
      }
      
      const newStories = [...state.stories, action.payload];
      return {
        ...state,
        stories: newStories
      };

    case 'UPDATE_STORY':
      // Update in user's personal database
      if (state.currentUser && action.payload.authorId === state.currentUser.id) {
        userDatabase.updateUserStory(state.currentUser.id, action.payload.id, action.payload);
        userDatabase.logActivity(state.currentUser.id, {
          type: 'story_updated',
          storyId: action.payload.id,
          storyTitle: action.payload.title
        });
      }
      
      const updatedStories = state.stories.map(story =>
        story.id === action.payload.id ? action.payload : story
      );
      return {
        ...state,
        stories: updatedStories
      };

    case 'DELETE_STORY':
      // Delete from user's personal database
      if (state.currentUser) {
        const storyToDelete = state.stories.find(s => s.id === action.payload);
        if (storyToDelete && storyToDelete.authorId === state.currentUser.id) {
          userDatabase.deleteUserStory(state.currentUser.id, action.payload);
          userDatabase.logActivity(state.currentUser.id, {
            type: 'story_deleted',
            storyId: action.payload,
            storyTitle: storyToDelete.title
          });
        }
      }
      
      const filteredStories = state.stories.filter(story => story.id !== action.payload);
      return {
        ...state,
        stories: filteredStories
      };

    case 'LIKE_STORY':
      // Update user's personal likes
      if (state.currentUser) {
        const isLiked = userDatabase.toggleLike(state.currentUser.id, action.payload);
        const story = state.stories.find(s => s.id === action.payload);
        userDatabase.logActivity(state.currentUser.id, {
          type: isLiked ? 'story_liked' : 'story_unliked',
          storyId: action.payload,
          storyTitle: story?.title
        });
      }
      
      const storiesWithLike = state.stories.map(story => {
        if (story.id === action.payload) {
          const isLiked = !story.isLiked;
          return {
            ...story,
            isLiked,
            likes: isLiked ? story.likes + 1 : story.likes - 1
          };
        }
        return story;
      });
      return {
        ...state,
        stories: storiesWithLike
      };

    case 'BOOKMARK_STORY':
      // Update user's personal bookmarks
      if (state.currentUser) {
        const story = state.stories.find(s => s.id === action.payload);
        const isBookmarked = !story?.isBookmarked;
        
        if (isBookmarked) {
          userDatabase.addBookmark(state.currentUser.id, action.payload);
        } else {
          userDatabase.removeBookmark(state.currentUser.id, action.payload);
        }
        
        userDatabase.logActivity(state.currentUser.id, {
          type: isBookmarked ? 'story_bookmarked' : 'story_unbookmarked',
          storyId: action.payload,
          storyTitle: story?.title
        });
      }
      
      const storiesWithBookmark = state.stories.map(story =>
        story.id === action.payload
          ? { ...story, isBookmarked: !story.isBookmarked }
          : story
      );
      return {
        ...state,
        stories: storiesWithBookmark
      };

    case 'ADD_COMMENT':
      // Add to user's personal comments
      if (state.currentUser) {
        userDatabase.addUserComment(state.currentUser.id, action.payload);
        const story = state.stories.find(s => s.id === action.payload.storyId);
        userDatabase.logActivity(state.currentUser.id, {
          type: 'comment_added',
          storyId: action.payload.storyId,
          storyTitle: story?.title,
          commentId: action.payload.id
        });
      }
      
      const newComments = [...state.comments, action.payload];
      
      // Update story comment count
      const storiesWithComment = state.stories.map(story =>
        story.id === action.payload.storyId
          ? { ...story, comments: story.comments + 1 }
          : story
      );
      
      return {
        ...state,
        comments: newComments,
        stories: storiesWithComment
      };

    case 'LIKE_COMMENT':
      const commentsWithLike = state.comments.map(comment =>
        comment.id === action.payload
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      );
      return {
        ...state,
        comments: commentsWithLike
      };

    case 'FOLLOW_USER':
      // Update user's following list
      if (state.currentUser && action.payload !== state.currentUser.id) {
        userDatabase.followUser(state.currentUser.id, action.payload);
        const targetUser = state.users?.find(u => u.id === action.payload);
        userDatabase.logActivity(state.currentUser.id, {
          type: 'user_followed',
          targetUserId: action.payload,
          targetUserName: targetUser?.name
        });
      }
      return state;

    case 'UNFOLLOW_USER':
      // Update user's following list
      if (state.currentUser && action.payload !== state.currentUser.id) {
        userDatabase.unfollowUser(state.currentUser.id, action.payload);
        const targetUser = state.users?.find(u => u.id === action.payload);
        userDatabase.logActivity(state.currentUser.id, {
          type: 'user_unfollowed',
          targetUserId: action.payload,
          targetUserName: targetUser?.name
        });
      }
      return state;

    case 'JOIN_EVENT':
      const eventsWithJoin = state.events.map(event =>
        event.id === action.payload
          ? {
              ...event,
              isJoined: !event.isJoined,
              participants: event.isJoined ? event.participants - 1 : event.participants + 1
            }
          : event
      );
      return {
        ...state,
        events: eventsWithJoin
      };

    case 'JOIN_GROUP':
      const groupsWithJoin = state.groups.map(group =>
        group.id === action.payload
          ? {
              ...group,
              isJoined: !group.isJoined,
              members: group.isJoined ? group.members - 1 : group.members + 1
            }
          : group
      );
      return {
        ...state,
        groups: groupsWithJoin
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload
      };

    case 'UPDATE_USER_PROFILE':
      // Update user profile in database
      if (state.currentUser) {
        const updatedProfile = userDatabase.updateUserProfile(state.currentUser.id, action.payload);
        userDatabase.logActivity(state.currentUser.id, {
          type: 'profile_updated'
        });
        
        return {
          ...state,
          currentUser: updatedProfile
        };
      }
      return state;

    case 'LOAD_USER_DATA':
      // Load user-specific data from their database
      if (action.payload.userId) {
        const dashboardData = userDatabase.getUserDashboardData(action.payload.userId);
        const userLikes = userDatabase.getUserLikes(action.payload.userId);
        const userBookmarks = userDatabase.getUserBookmarks(action.payload.userId);
        
        // Update stories with user's like/bookmark status
        const storiesWithUserData = state.stories.map(story => ({
          ...story,
          isLiked: userLikes.includes(story.id),
          isBookmarked: userBookmarks.includes(story.id)
        }));
        
        return {
          ...state,
          stories: storiesWithUserData,
          userDashboardData: dashboardData
        };
      }
      return state;

    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load data from localStorage or use mock data
    const savedUser = localStorage.getItem('currentUser');

    dispatch({
      type: 'LOAD_DATA',
      payload: {
        stories: mockData.stories,
        comments: mockData.comments,
        discussions: mockData.discussions,
        events: mockData.events,
        groups: mockData.groups,
        achievements: mockData.achievements,
        activities: mockData.activities,
        currentUser: savedUser ? JSON.parse(savedUser) : mockData.currentUser,
        isAuthenticated: !!savedUser
      }
    });
    
    // Load user-specific data if authenticated
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch({
        type: 'LOAD_USER_DATA',
        payload: { userId: user.id }
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};