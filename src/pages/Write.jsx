@@ .. @@
   if (!state.isAuthenticated) {
     return (
       <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h1>
           <p className="text-gray-600 mb-8">You need to sign in to write stories.</p>
-          <button 
-            onClick={() => {
-              // Simulate sign in
-              localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
-              window.location.reload();
-            }}
-            className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
-          >
-            Sign In
-          </button>
+          <Link 
+            to="/signin"
+            className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors inline-block"
+          >
+            Sign In
+          </Link>
         </div>
       </div>
     );
   }