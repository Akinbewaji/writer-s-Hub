import { v4 as uuidv4 } from 'uuid';

/**
 * User Database Management System
 * Handles individual user data with unique identifiers
 */

class UserDatabase {
  constructor() {
    this.storagePrefix = 'wrh_user_';
    this.globalStorageKey = 'wrh_global_data';
  }

  /**
   * Generate unique user identifier
   */
  generateUserId() {
    return uuidv4();
  }

  /**
   * Get user-specific storage key
   */
  getUserStorageKey(userId, dataType) {
    return `${this.storagePrefix}${userId}_${dataType}`;
  }

  /**
   * Initialize user database
   */
  initializeUser(userId, userData) {
    const userKey = this.getUserStorageKey(userId, 'profile');
    const userProfile = {
      id: userId,
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      settings: {
        theme: 'light',
        notifications: true,
        privacy: 'public'
      },
      stats: {
        storiesPublished: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        followers: 0,
        following: 0
      }
    };

    localStorage.setItem(userKey, JSON.stringify(userProfile));
    this.updateGlobalUserList(userId);
    return userProfile;
  }

  /**
   * Get user profile
   */
  getUserProfile(userId) {
    const userKey = this.getUserStorageKey(userId, 'profile');
    const profile = localStorage.getItem(userKey);
    return profile ? JSON.parse(profile) : null;
  }

  /**
   * Update user profile
   */
  updateUserProfile(userId, updates) {
    const profile = this.getUserProfile(userId);
    if (!profile) return null;

    const updatedProfile = {
      ...profile,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const userKey = this.getUserStorageKey(userId, 'profile');
    localStorage.setItem(userKey, JSON.stringify(updatedProfile));
    return updatedProfile;
  }

  /**
   * Get user stories
   */
  getUserStories(userId) {
    const storiesKey = this.getUserStorageKey(userId, 'stories');
    const stories = localStorage.getItem(storiesKey);
    return stories ? JSON.parse(stories) : [];
  }

  /**
   * Add story to user database
   */
  addUserStory(userId, story) {
    const stories = this.getUserStories(userId);
    const newStory = {
      ...story,
      id: story.id || uuidv4(),
      authorId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    stories.push(newStory);
    const storiesKey = this.getUserStorageKey(userId, 'stories');
    localStorage.setItem(storiesKey, JSON.stringify(stories));

    // Update user stats
    this.updateUserStats(userId, { storiesPublished: stories.length });
    
    return newStory;
  }

  /**
   * Update user story
   */
  updateUserStory(userId, storyId, updates) {
    const stories = this.getUserStories(userId);
    const storyIndex = stories.findIndex(story => story.id === storyId);
    
    if (storyIndex === -1) return null;

    stories[storyIndex] = {
      ...stories[storyIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const storiesKey = this.getUserStorageKey(userId, 'stories');
    localStorage.setItem(storiesKey, JSON.stringify(stories));
    
    return stories[storyIndex];
  }

  /**
   * Delete user story
   */
  deleteUserStory(userId, storyId) {
    const stories = this.getUserStories(userId);
    const filteredStories = stories.filter(story => story.id !== storyId);
    
    const storiesKey = this.getUserStorageKey(userId, 'stories');
    localStorage.setItem(storiesKey, JSON.stringify(filteredStories));

    // Update user stats
    this.updateUserStats(userId, { storiesPublished: filteredStories.length });
    
    return true;
  }

  /**
   * Get user bookmarks
   */
  getUserBookmarks(userId) {
    const bookmarksKey = this.getUserStorageKey(userId, 'bookmarks');
    const bookmarks = localStorage.getItem(bookmarksKey);
    return bookmarks ? JSON.parse(bookmarks) : [];
  }

  /**
   * Add bookmark
   */
  addBookmark(userId, storyId) {
    const bookmarks = this.getUserBookmarks(userId);
    if (!bookmarks.includes(storyId)) {
      bookmarks.push(storyId);
      const bookmarksKey = this.getUserStorageKey(userId, 'bookmarks');
      localStorage.setItem(bookmarksKey, JSON.stringify(bookmarks));
    }
    return bookmarks;
  }

  /**
   * Remove bookmark
   */
  removeBookmark(userId, storyId) {
    const bookmarks = this.getUserBookmarks(userId);
    const filteredBookmarks = bookmarks.filter(id => id !== storyId);
    const bookmarksKey = this.getUserStorageKey(userId, 'bookmarks');
    localStorage.setItem(bookmarksKey, JSON.stringify(filteredBookmarks));
    return filteredBookmarks;
  }

  /**
   * Get user likes
   */
  getUserLikes(userId) {
    const likesKey = this.getUserStorageKey(userId, 'likes');
    const likes = localStorage.getItem(likesKey);
    return likes ? JSON.parse(likes) : [];
  }

  /**
   * Toggle like
   */
  toggleLike(userId, storyId) {
    const likes = this.getUserLikes(userId);
    const isLiked = likes.includes(storyId);
    
    let updatedLikes;
    if (isLiked) {
      updatedLikes = likes.filter(id => id !== storyId);
    } else {
      updatedLikes = [...likes, storyId];
    }

    const likesKey = this.getUserStorageKey(userId, 'likes');
    localStorage.setItem(likesKey, JSON.stringify(updatedLikes));
    
    return !isLiked;
  }

  /**
   * Get user comments
   */
  getUserComments(userId) {
    const commentsKey = this.getUserStorageKey(userId, 'comments');
    const comments = localStorage.getItem(commentsKey);
    return comments ? JSON.parse(comments) : [];
  }

  /**
   * Add user comment
   */
  addUserComment(userId, comment) {
    const comments = this.getUserComments(userId);
    const newComment = {
      ...comment,
      id: comment.id || uuidv4(),
      authorId: userId,
      createdAt: new Date().toISOString()
    };

    comments.push(newComment);
    const commentsKey = this.getUserStorageKey(userId, 'comments');
    localStorage.setItem(commentsKey, JSON.stringify(comments));
    
    return newComment;
  }

  /**
   * Get user following list
   */
  getUserFollowing(userId) {
    const followingKey = this.getUserStorageKey(userId, 'following');
    const following = localStorage.getItem(followingKey);
    return following ? JSON.parse(following) : [];
  }

  /**
   * Follow user
   */
  followUser(userId, targetUserId) {
    const following = this.getUserFollowing(userId);
    if (!following.includes(targetUserId)) {
      following.push(targetUserId);
      const followingKey = this.getUserStorageKey(userId, 'following');
      localStorage.setItem(followingKey, JSON.stringify(following));

      // Update stats
      this.updateUserStats(userId, { following: following.length });
      this.incrementFollowerCount(targetUserId);
    }
    return following;
  }

  /**
   * Unfollow user
   */
  unfollowUser(userId, targetUserId) {
    const following = this.getUserFollowing(userId);
    const filteredFollowing = following.filter(id => id !== targetUserId);
    const followingKey = this.getUserStorageKey(userId, 'following');
    localStorage.setItem(followingKey, JSON.stringify(filteredFollowing));

    // Update stats
    this.updateUserStats(userId, { following: filteredFollowing.length });
    this.decrementFollowerCount(targetUserId);
    
    return filteredFollowing;
  }

  /**
   * Update user statistics
   */
  updateUserStats(userId, stats) {
    const profile = this.getUserProfile(userId);
    if (!profile) return null;

    const updatedProfile = {
      ...profile,
      stats: {
        ...profile.stats,
        ...stats
      },
      updatedAt: new Date().toISOString()
    };

    const userKey = this.getUserStorageKey(userId, 'profile');
    localStorage.setItem(userKey, JSON.stringify(updatedProfile));
    return updatedProfile;
  }

  /**
   * Increment follower count
   */
  incrementFollowerCount(userId) {
    const profile = this.getUserProfile(userId);
    if (profile) {
      this.updateUserStats(userId, { 
        followers: profile.stats.followers + 1 
      });
    }
  }

  /**
   * Decrement follower count
   */
  decrementFollowerCount(userId) {
    const profile = this.getUserProfile(userId);
    if (profile) {
      this.updateUserStats(userId, { 
        followers: Math.max(0, profile.stats.followers - 1) 
      });
    }
  }

  /**
   * Get user activity log
   */
  getUserActivity(userId) {
    const activityKey = this.getUserStorageKey(userId, 'activity');
    const activity = localStorage.getItem(activityKey);
    return activity ? JSON.parse(activity) : [];
  }

  /**
   * Log user activity
   */
  logActivity(userId, activity) {
    const activities = this.getUserActivity(userId);
    const newActivity = {
      id: uuidv4(),
      ...activity,
      timestamp: new Date().toISOString()
    };

    activities.unshift(newActivity); // Add to beginning
    
    // Keep only last 100 activities
    if (activities.length > 100) {
      activities.splice(100);
    }

    const activityKey = this.getUserStorageKey(userId, 'activity');
    localStorage.setItem(activityKey, JSON.stringify(activities));
    
    return newActivity;
  }

  /**
   * Update global user list
   */
  updateGlobalUserList(userId) {
    const globalData = this.getGlobalData();
    if (!globalData.users.includes(userId)) {
      globalData.users.push(userId);
      globalData.totalUsers = globalData.users.length;
      globalData.updatedAt = new Date().toISOString();
      localStorage.setItem(this.globalStorageKey, JSON.stringify(globalData));
    }
  }

  /**
   * Get global platform data
   */
  getGlobalData() {
    const globalData = localStorage.getItem(this.globalStorageKey);
    return globalData ? JSON.parse(globalData) : {
      users: [],
      totalUsers: 0,
      totalStories: 0,
      totalViews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Delete user data (GDPR compliance)
   */
  deleteUserData(userId) {
    const dataTypes = ['profile', 'stories', 'bookmarks', 'likes', 'comments', 'following', 'activity'];
    
    dataTypes.forEach(dataType => {
      const key = this.getUserStorageKey(userId, dataType);
      localStorage.removeItem(key);
    });

    // Remove from global user list
    const globalData = this.getGlobalData();
    globalData.users = globalData.users.filter(id => id !== userId);
    globalData.totalUsers = globalData.users.length;
    globalData.updatedAt = new Date().toISOString();
    localStorage.setItem(this.globalStorageKey, JSON.stringify(globalData));

    return true;
  }

  /**
   * Export user data (GDPR compliance)
   */
  exportUserData(userId) {
    const dataTypes = ['profile', 'stories', 'bookmarks', 'likes', 'comments', 'following', 'activity'];
    const userData = {};

    dataTypes.forEach(dataType => {
      const key = this.getUserStorageKey(userId, dataType);
      const data = localStorage.getItem(key);
      userData[dataType] = data ? JSON.parse(data) : null;
    });

    return userData;
  }

  /**
   * Get user dashboard data
   */
  getUserDashboardData(userId) {
    const profile = this.getUserProfile(userId);
    const stories = this.getUserStories(userId);
    const activity = this.getUserActivity(userId);
    const bookmarks = this.getUserBookmarks(userId);

    return {
      profile,
      stories,
      activity: activity.slice(0, 10), // Last 10 activities
      bookmarks,
      stats: profile?.stats || {}
    };
  }
}

// Create singleton instance
const userDatabase = new UserDatabase();

export default userDatabase;