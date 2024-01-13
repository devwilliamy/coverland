import React from 'react';

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="flex min-h-[70vh] h-[70vh]">
      <div className="flex flex-col items-center w-3/12 h-full p-2 bg-green-400 ">
        <div className="text-2xl font-extrabold ">My Account</div>
        <div className="text-xl font-thin pt-2">My Orders</div>
      </div>
      <div className="flex flex-col w-9/12 h-full bg-blue-400">
        <div>My Account</div>
        <div className="div"></div>
      </div>
    </div>
  );
};

export default Profile;
