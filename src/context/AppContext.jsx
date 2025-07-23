import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockData } from '../data/mockData';

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
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: !!action.payload
      };

    case 'ADD_STORY':
      const newStories = [...state.stories, action.payload];
      localStorage.setItem('stories', JSON.stringify(newStories));
      return {
        ...state,
        stories: newStories
      };

    case 'UPDATE_STORY':
      const updatedStories = state.stories.map(story =>
        story.id === action.payload.id ? action.payload : story
      );
      localStorage.setItem('stories', JSON.stringify(updatedStories));
      return {
        ...state,
        stories: updatedStories
      };

    case 'DELETE_STORY':
      const filteredStories = state.stories.filter(story => story.id !== action.payload);
      localStorage.setItem('stories', JSON.stringify(filteredStories));
      return {
        ...state,
        stories: filteredStories
      };

    case 'LIKE_STORY':
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
      localStorage.setItem('stories', JSON.stringify(storiesWithLike));
      return {
        ...state,
        stories: storiesWithLike
      };

    case 'BOOKMARK_STORY':
      const storiesWithBookmark = state.stories.map(story =>
        story.id === action.payload
          ? { ...story, isBookmarked: !story.isBookmarked }
          : story
      );
      localStorage.setItem('stories', JSON.stringify(storiesWithBookmark));
      return {
        ...state,
        stories: storiesWithBookmark
      };

    case 'ADD_COMMENT':
      const newComments = [...state.comments, action.payload];
      localStorage.setItem('comments', JSON.stringify(newComments));
      
      // Update story comment count
      const storiesWithComment = state.stories.map(story =>
        story.id === action.payload.storyId
          ? { ...story, comments: story.comments + 1 }
          : story
      );
      localStorage.setItem('stories', JSON.stringify(storiesWithComment));
      
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
      localStorage.setItem('comments', JSON.stringify(commentsWithLike));
      return {
        ...state,
        comments: commentsWithLike
      };

    case 'FOLLOW_USER':
      // In a real app, this would update the user's following list
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
      localStorage.setItem('events', JSON.stringify(eventsWithJoin));
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
      localStorage.setItem('groups', JSON.stringify(groupsWithJoin));
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
    const savedStories = localStorage.getItem('stories');
    const savedComments = localStorage.getItem('comments');
    const savedEvents = localStorage.getItem('events');
    const savedGroups = localStorage.getItem('groups');
    const savedUser = localStorage.getItem('currentUser');

    dispatch({
      type: 'LOAD_DATA',
      payload: {
        stories: savedStories ? JSON.parse(savedStories) : mockData.stories,
        comments: savedComments ? JSON.parse(savedComments) : mockData.comments,
        discussions: mockData.discussions,
        events: savedEvents ? JSON.parse(savedEvents) : mockData.events,
        groups: savedGroups ? JSON.parse(savedGroups) : mockData.groups,
        achievements: mockData.achievements,
        activities: mockData.activities,
        currentUser: savedUser ? JSON.parse(savedUser) : mockData.currentUser,
        isAuthenticated: !!savedUser
      }
    });
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