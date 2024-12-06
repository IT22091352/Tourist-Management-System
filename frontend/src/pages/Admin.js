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

import UpdateUser from '../Components/UpdateUser/UpdateUser';
import UserDetails from '../Components/UserDetails/Users';
import Transport from '../Components/Renatal System/Admin/Transport/Transport';

import ReviewAdmin from "../Components/Reviews/Admin/ReviewAdmin";
import BookingsAdmin from '../Components/Booking/BookingsAdmin';
import Users from "../Components/UserDetails/Users";
import AdminGuide from "../Components/Guide/Admin/Guide/AdminGuide";
import Guides from '../Components/Service/Guide/Guides';
import AdminTab from './AdminTab/AdminTab';
import Home from '../Components/Home/Home';
import HomeAd from '../Components/Home/HomeAd';

const Admin = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [activeTab, setActiveTab] = useState('tab0'); // State to manage active tab


   

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

        { id: 'tab20', name: 'Admin Transport', url: '/transport-guide' },

     
        { id: 'tab23', name: 'Gallery Admin', url: '/gallery-admin' },
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
            {activeTab === 'tab0' && <HomeAd />}
            {activeTab === 'tab1' && <MemoryReportPage />}
            {activeTab === 'tab5' && <AddItem />}
            {activeTab === 'tab8' && <ATicket />}
         
            {activeTab === 'tab13' && <ReviewAdmin />}
            {activeTab === 'tab14' && <InsuranceManager />}
            {activeTab === 'tab15' && <MemoryReportPage />}
            {activeTab === 'tab16' && <Guides />}
            {activeTab === 'tab20' && <Transport />}
            
       

                
                {activeTab === 'tab2' && <PackagesComponent />}
                
                {activeTab === 'tab3' && <Bookings />}
                {activeTab === 'tab4' && <PackagesComponent />}
                {activeTab === 'tab6' && <AddGuide />}
                {activeTab === 'tab7' && <ContSALive />}
               
                {activeTab === 'tab9' && <AdminLPage />}
                {activeTab === 'tab18' && <UserDetails />}
                {activeTab === 'tab19' && <BookingsAdmin />}

                {activeTab === 'tab22' && <Users />}
                {activeTab === 'tab23' && <AdminTab />}
                
                

                
            </div>
        </div>
    </div>

    );
}

export default Admin;
