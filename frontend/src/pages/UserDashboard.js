import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import axios from 'axios';
import MemoryReportPage from './AdminTab/memory_report_page';
import AddUser from '../Components/AddUser/AddUser';

import PackagesComponent from "../Components/Admin/ReviewManagement";
import AddItem from '../Components/Renatal System/Admin/Add Transport/AddItem';
import AddGuide from '../Components/Guide/Admin/Add Item/AddTransport';
import ContSALive from '../Components/Support/ContSALive/ContSALive';
import ATicket from '../Components/AdminTAnswer/ATicket/ATicket';
import AdminLPage from '../Components/Support/AdminLPage/AdminLpage';
import Bookings from '../Components/Booking/Bookings';
import ATickets from '../Components/Support/AdminTAnswer/ATicketDetails/ATickets';
import AddFAQs from '../Components/Support/FAQ/AddFAQs';
import UpdateFAQs from '../Components/Support/FAQ/UpdateFAQs';
import UserAdmin from '../Components/Admin/ReviewManagement';
import ReviewManagement from '../Components/Admin/ReviewManagement';
import InsuranceManager from '../Components/Tourist/InsuranceManager';
import AdminTab from './AdminTab/AdminTab';
import UpdateUser from '../Components/UpdateUser/UpdateUser';
import UserDetails from '../Components/UserDetails/Users';
import SeeReviews from '../Components/Reviews/UserDetails/SeeReviews';
import ViewGuides from '../Components/Guide/User/Item/ViewGuides';
import UserItems from "../Components/Renatal System/User/ViewGuides/Items";
import UserLPage from '../Components/Support/UserDo/UserLPage';

const UserDashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [activeTab, setActiveTab] = useState('tab1'); // State to manage active tab


   

    const tabDetails = [
        // { id: 'tab1', name: 'Average Views Dashboard', url: '/memory_report_page' }, // Example tab without category
        // { id: 'tab2', name: 'View Packages', url: '/packages' }, // Change the URL for other tabs if needed
        // { id: 'tab3', name: 'View Bookings', url: '/bookings' },
        
        // { id: 'tab4', name: 'View Reviews', url: '/adminseereviews' },
        { id: 'tab5', name: 'Add Items', url: '/add-items' },
        // { id: 'tab6', name: 'Add Guide', url: '/add-guides' },
        // { id: 'tab7', name: 'Manage Guides', url: '/admin-guides' },
        // { id: 'tab8', name: 'ContSALive', url: '/ContSALive' },
        { id: 'tab9', name: 'ATicket', url: '/ATicket' },
        { id: 'tab13', name: 'Reviews Management', url: '/user-management' },
        { id: 'tab14', name: 'Insurance Management', url: '/insurance-management' },
   
        { id: 'tab16', name: 'Guide Management', url: '/guide-management' },
        { id: 'tab18', name: 'User Management', url: '/user' },
        { id: 'tab19', name: 'Booking Management', url: '/booking' },
        { id: 'tab15', name: 'Memory', url: '/memory' },
        { id: 'tab20', name: 'See Reviews', url: '/see-reviews' },
        { id: 'tab21', name: 'View Guides', url: '/view-guides' },
        { id: 'tab22', name: 'Bookings', url: '/bookings' },
        // { id: 'tab11', name: 'ATicketDetails', url: '/ACrudApp' },
        // { id: 'tab12', name: 'Ticket Management', url: '/AdminLpage' },
        
        
    ];

    
    const handleTabClick = (tab) => {
        setActiveTab(tab.id);
        
    };



    return (
        <div className='h-100 d-flex'>
        <div className='col-2 bg-dark'>
            <div className="nav flex-column nav-pills vh-100" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {tabDetails.map(tab => (
                    
                    (
                        <button
                            key={tab.id}
                            className={`nav-link text-light ${activeTab === tab.id ? 'bg-success active' : ''}`}
                            onClick={() => handleTabClick(tab)}
                            style={{ marginTop: '10px' }}
                        >
                            {tab.name}
                        </button>
                    )
                    
                ))}
            </div>
        </div>
        <div className='col-10 h-100'>
            <div className="tab-content" id="v-pills-tabContent">
            {activeTab === 'tab1' && <MemoryReportPage />}
            {activeTab === 'tab5' && <AddItem />}
            {activeTab === 'tab8' && <ATicket />}
         
            {activeTab === 'tab13' && <ReviewManagement />}
            {activeTab === 'tab14' && <InsuranceManager />}
            {activeTab === 'tab15' && <MemoryReportPage />}
            {activeTab === 'tab16' && <AddGuide />}
          
       

                
                {activeTab === 'tab2' && <PackagesComponent />}
                
                {activeTab === 'tab3' && <Bookings />}
                {activeTab === 'tab4' && <PackagesComponent />}
                {activeTab === 'tab6' && <AddGuide />}
                {activeTab === 'tab7' && <ContSALive />}
               
                {activeTab === 'tab9' && <UserLPage />}
                {activeTab === 'tab18' && <UserDetails />}
                {activeTab === 'tab19' && <Bookings />}
                {activeTab === 'tab20' && <SeeReviews />}
                {activeTab === 'tab21' && <UserItems/>}
                {activeTab === 'tab22' && <Bookings/>}

                
            </div>
        </div>
    </div>

    );
}

export default UserDashboard;
