import React from 'react';

function Navbar() {
    return (
        <div className="navbar flex flex-col bg-navbar-bg col-span-1 ">
            <div className="navbar-logo h-5 bg-contain bg-no-repeat bg-[url('https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg')]" ></div>
            <div className="navbar-item">
                Khám phá
            </div>
            <div className="navbar-item">
                ZingChart
            </div>
            <div className="navbar-item">
                Nhạc mới
            </div>
            <div className="navbar-item">
                Thể loại
            </div>
            <div className="navbar-item">
                Top 100
            </div>
        </div>
    );
}

export default Navbar;