import { useState, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import PageLayout from "../components/PageLayout";
import { Bell, User, Shield, ChevronRight } from "lucide-react";

const Settings = () => {
  // State for save status
  const [saveStatus, setSaveStatus] = useState({ loading: false, error: null });

  // State for user profile
  const [profile, setProfile] = useState({
    displayName: "",
    email: ""
  });

  // State for notification preferences
  const [notifications, setNotifications] = useState({
    workoutReminders: false,
    progressUpdates: false
  });

  // State for privacy settings
  const [privacy, setPrivacy] = useState({
    isPublic: false,
    shareProgress: false
  });

  // Load saved settings on component mount
  useEffect(() => {
    const loadSavedSettings = () => {
      try {
        // Load profile settings
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }

        // Load notification settings
        const savedNotifications = localStorage.getItem('userNotifications');
        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications));
        }

        // Load privacy settings
        const savedPrivacy = localStorage.getItem('userPrivacy');
        if (savedPrivacy) {
          setPrivacy(JSON.parse(savedPrivacy));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSavedSettings();
  }, []);

  // Handle profile changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle privacy toggle
  const handlePrivacyToggle = (setting) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Save and apply all settings
  const handleSaveSettings = async () => {
    setSaveStatus({ loading: true, error: null });

    try {
      // 1. Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (profile.email && !emailRegex.test(profile.email)) {
        throw new Error('Invalid email format');
      }

      // 2. Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile));
      localStorage.setItem('userNotifications', JSON.stringify(notifications));
      localStorage.setItem('userPrivacy', JSON.stringify(privacy));

      // 3. Apply notification settings
      if (notifications.workoutReminders) {
        // Request notification permissions if enabled
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            throw new Error('Notification permission denied');
          }
        }
      }

      // 4. Apply privacy settings
      if (privacy.isPublic) {
        // Update visibility in your user profile
        // This would typically be an API call
        console.log('Profile visibility updated to public');
      }

      // 5. Show success message
      setSaveStatus({ loading: false, error: null });
      alert('Settings saved successfully!');

    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus({ loading: false, error: error.message });
    }
  };

  return (
    <PageLayout title="Settings">
      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg divide-y dark:divide-gray-700">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Theme Preferences
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose between light and dark mode
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Notifications
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your notification preferences
                </p>
              </div>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">Workout Reminders</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.workoutReminders}
                    onChange={() => handleNotificationToggle("workoutReminders")}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">Progress Updates</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.progressUpdates}
                    onChange={() => handleNotificationToggle("progressUpdates")}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Profile Settings
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your personal information
                </p>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={profile.displayName}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Privacy
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your privacy settings
                </p>
              </div>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">Make profile public</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacy.isPublic}
                    onChange={() => handlePrivacyToggle("isPublic")}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              <button
                onClick={handleSaveSettings}
                disabled={saveStatus.loading}
                className={`w-full sm:w-auto px-4 py-2.5 ${
                  saveStatus.loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-medium rounded-lg transition-colors`}
              >
                {saveStatus.loading ? 'Saving...' : 'Save Changes'}
              </button>

              {/* Error Message */}
              {saveStatus.error && (
                <p className="text-red-500 text-sm">{saveStatus.error}</p>
              )}

              {/* Settings Status */}
              <div className="text-sm text-gray-500">
                <h4 className="font-medium">Current Settings Status:</h4>
                <ul className="mt-2 space-y-1">
                  <li>• Profile: {profile.displayName ? 'Configured' : 'Not configured'}</li>
                  <li>• Notifications: {Object.values(notifications).some(v => v) ? 'Enabled' : 'Disabled'}</li>
                  <li>• Privacy: {privacy.isPublic ? 'Public Profile' : 'Private Profile'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;