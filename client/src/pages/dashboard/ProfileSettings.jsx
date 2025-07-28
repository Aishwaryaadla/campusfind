import { Camera, Mail, Phone, MapPin, Bell, Eye, Trash2, Download } from 'lucide-react';

export default function ProfileSettings() {
  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-semibold">Profile Settings</h1>
        <p className="text-gray-500">Manage your account information and preferences.</p>
      </div>

      {/* Profile Information */}
      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-6">
          {/* <h2 className="card-title">Profile Information</h2>

          <div className="flex items-center space-x-6">
            <div className="avatar">
              <div className="w-20 rounded-full bg-neutral text-neutral-content">
                <span className="text-xl">JD</span>
              </div>
            </div>
            <div>
              <button className="btn btn-outline btn-sm">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </button>
              <p className="text-sm text-gray-500 mt-1">JPG, PNG, GIF. Max 2MB.</p>
            </div>
          </div> */}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input type="text" className="input input-bordered w-full" defaultValue="John" />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input type="text" className="input input-bordered w-full" defaultValue="Doe" />
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" className="input input-bordered w-full" defaultValue="john.doe@university.edu" />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input type="tel" className="input input-bordered w-full" defaultValue="+1 (555) 123-4567" />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" placeholder="Tell others about yourself...">
Computer Science student at University. Always happy to help reunite lost items with their owners!
            </textarea>
          </div>

          <div>
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-6">
          <h2 className="card-title">Notification Settings</h2>

          {[
            {
              icon: <Bell className="w-5 h-5 text-gray-500" />,
              title: 'Email Notifications',
              desc: 'Receive notifications via email',
              checked: true,
            },
            
          ].map((setting, index) => (
            <div key={index}>
              {index === 1 && <div className="divider my-2" />}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{setting.title}</p>
                  <p className="text-sm text-gray-500">{setting.desc}</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked={setting.checked} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-6">
          <h2 className="card-title">Account Actions</h2>


          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
            </div>
            <button className="btn btn-error">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
