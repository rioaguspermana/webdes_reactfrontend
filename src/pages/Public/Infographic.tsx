import { Outlet } from 'react-router-dom';

import HeaderComponent from '@/component/Public/Header';
import FooterComponent from '@/component/Public/Footer';
import SubmenuInfografisComponent from '@/component/Public/Infografi/SubmenuInfografis';


function Infographic() {
    return (
        <div>
            <HeaderComponent is_homepage={false} />
            <div className="mt-24 bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 dark:bg-green-700 transition-colors">
                <SubmenuInfografisComponent />
                <main className="py-6">
                    <Outlet />
                </main>
            </div>
            <FooterComponent />
        </div>
    );
}

export default Infographic;