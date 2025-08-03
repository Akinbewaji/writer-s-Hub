@@ .. @@
 import React, { useState } from 'react';
+import { Navigate } from 'react-router-dom';
 import { Edit, Settings, BookOpen, Heart, MessageSquare, Award, Calendar, Users } from 'lucide-react';
+import { useApp } from '../context/AppContext';

-const Profile = () => {
+const Profile = () => {
+  const { state } = useApp();
   const [activeTab, setActiveTab] = useState('stories');

+  // Redirect to sign in if not authenticated
+  if (!state.isAuthenticated) {
+    return <Navigate to="/signin" replace />;
+  }
+
   const userStats = [