import React from 'react';
import './ProfileScreen.css';
import '../reset.css';
import profileImage from '../profile.jpg';

const ProfileScreen: React.FC = () => {
  return (
    <div className="profile-screen">
        <div className="profile-image">
            <img src={profileImage} alt="profile" className="profile-image" />
        </div>
        <div className="profile-text">
            <div className="name">
                <h2>林&nbsp;瑠奈</h2>
                <p>はやし るな<span>hayashi runa</span></p>
            </div>
            <div className='table'>
                <dl>
                    <dt>生年月日</dt>
                    <dd>2003年10月2日</dd>
                </dl>
                <dl>
                    <dt>血液型</dt>
                    <dd>O型</dd>
                </dl>
                <dl>
                    <dt>星座</dt>
                    <dd>てんびん座</dd>
                </dl>
                <dl>
                    <dt>身長</dt>
                    <dd>164cm</dd>
                </dl>
            </div>
            <div className="alternative">
                <ul>
                    <li>
                        <p>アンダー</p>
                    </li>
                    <li>
                        <p>4期生</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
};

export default ProfileScreen;
