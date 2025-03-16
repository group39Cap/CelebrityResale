import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dashboardStats, users, celebrityRequests } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Star,
  Gavel,
  DollarSign,
  Search,
  Bell,
  Edit,
  Shield,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-amber-100 text-amber-700';
      case 'celebrity':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const handleApproveRequest = (id: number) => {
    console.log(`Approved request for celebrity ID: ${id}`);
    // In a real app, this would make an API call to update the user's status
  };

  const handleRejectRequest = (id: number) => {
    console.log(`Rejected request for celebrity ID: ${id}`);
    // In a real app, this would make an API call to update the user's status
  };

  const handleEditUser = (id: number) => {
    console.log(`Edit user with ID: ${id}`);
    // In a real app, this would open an edit modal or redirect to an edit page
  };

  const handleChangeRole = (id: number) => {
    console.log(`Change role for user with ID: ${id}`);
    // In a real app, this would open a role selection dialog
  };

  const handleDeleteUser = (id: number) => {
    console.log(`Delete user with ID: ${id}`);
    // In a real app, this would show a confirmation dialog before deletion
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-primary text-white md:min-h-screen">
          <div className="p-4 border-b border-primary-light">
            <h2 className="text-xl font-['Playfair_Display'] text-[#D4AF37]">Admin Dashboard</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="ghost" 
                  className={`flex items-center w-full space-x-2 py-2 px-3 rounded justify-start ${activeTab === 'overview' ? 'bg-primary-light' : 'hover:bg-primary-light'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <LayoutDashboard size={18} />
                  <span>Overview</span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`flex items-center w-full space-x-2 py-2 px-3 rounded justify-start ${activeTab === 'users' ? 'bg-primary-light' : 'hover:bg-primary-light'}`}
                  onClick={() => setActiveTab('users')}
                >
                  <Users size={18} />
                  <span>User Management</span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`flex items-center w-full space-x-2 py-2 px-3 rounded justify-start ${activeTab === 'celebrities' ? 'bg-primary-light' : 'hover:bg-primary-light'}`}
                  onClick={() => setActiveTab('celebrities')}
                >
                  <Star size={18} />
                  <span>Celebrity Accounts</span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`flex items-center w-full space-x-2 py-2 px-3 rounded justify-start ${activeTab === 'auctions' ? 'bg-primary-light' : 'hover:bg-primary-light'}`}
                  onClick={() => setActiveTab('auctions')}
                >
                  <Gavel size={18} />
                  <span>Auctions</span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`flex items-center w-full space-x-2 py-2 px-3 rounded justify-start ${activeTab === 'transactions' ? 'bg-primary-light' : 'hover:bg-primary-light'}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  <DollarSign size={18} />
                  <span>Transactions</span>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-['Playfair_Display'] text-primary">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'celebrities' && 'Celebrity Accounts'}
              {activeTab === 'auctions' && 'Auction Management'}
              {activeTab === 'transactions' && 'Transaction History'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 py-2 rounded-md border border-neutral-200 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-300" size={16} />
              </div>
              <div className="relative">
                <Button variant="ghost" className="relative p-2 rounded-full text-neutral-300 hover:text-primary transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                  alt="Admin" 
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <span className="hidden md:block text-primary font-medium">Admin User</span>
              </div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="rounded-lg shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-neutral-300">Total Users</h3>
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <Users size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-['Montserrat'] font-semibold">
                      {dashboardStats.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-green-500 text-sm mt-2 flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="currentColor" />
                      </svg>
                      {dashboardStats.userGrowth}% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="rounded-lg shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-neutral-300">Celebrity Accounts</h3>
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                        <Star size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-['Montserrat'] font-semibold">
                      {dashboardStats.celebrityAccounts.toLocaleString()}
                    </p>
                    <p className="text-green-500 text-sm mt-2 flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="currentColor" />
                      </svg>
                      {dashboardStats.celebrityGrowth}% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="rounded-lg shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-neutral-300">Active Auctions</h3>
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                        <Gavel size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-['Montserrat'] font-semibold">
                      {dashboardStats.activeAuctions.toLocaleString()}
                    </p>
                    <p className="text-green-500 text-sm mt-2 flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="currentColor" />
                      </svg>
                      {dashboardStats.auctionGrowth}% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="rounded-lg shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-neutral-300">Total Revenue</h3>
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                        <DollarSign size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-['Montserrat'] font-semibold">
                      {formatCurrency(dashboardStats.totalRevenue)}
                    </p>
                    <p className="text-green-500 text-sm mt-2 flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="currentColor" />
                      </svg>
                      {dashboardStats.revenueGrowth}% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* User Management Preview */}
              <Card className="rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                  <h2 className="text-xl font-['Playfair_Display']">Recent Users</h2>
                  <Button 
                    onClick={() => setActiveTab('users')} 
                    className="bg-[#D4AF37] text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-[#e6c76a] transition-colors"
                  >
                    View All Users
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">User</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(0, 3).map((user) => (
                        <tr key={user.id} className="border-b border-neutral-200">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover mr-3" />
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-neutral-300">Joined: {user.joinedAt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <Badge className={`px-2 py-1 ${getRoleColor(user.role)} rounded-full text-xs`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`px-2 py-1 ${getStatusColor(user.status)} rounded-full text-xs`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              
              {/* Celebrity Approval Preview */}
              <Card className="rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-['Playfair_Display']">Celebrity Status Requests</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {celebrityRequests.slice(0, 2).map((request) => (
                      <div key={request.id} className="flex flex-col md:flex-row md:items-center p-4 border border-neutral-200 rounded-lg">
                        <div className="flex items-center mb-4 md:mb-0 md:w-1/4">
                          <img src={request.image} alt={request.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                          <div>
                            <p className="font-medium">{request.name}</p>
                            <p className="text-xs text-neutral-300">{request.role}</p>
                          </div>
                        </div>
                        <div className="mb-4 md:mb-0 md:w-1/4">
                          <p className="text-sm text-neutral-300 mb-1">Email</p>
                          <p>{request.email}</p>
                        </div>
                        <div className="mb-4 md:mb-0 md:w-1/4">
                          <p className="text-sm text-neutral-300 mb-1">Verification</p>
                          <div className="flex items-center flex-wrap gap-2">
                            <Badge className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              ID Verified
                            </Badge>
                            <Badge className={`px-2 py-1 ${request.agentConfirmed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} rounded-full text-xs`}>
                              {request.agentConfirmed ? 'Agent Confirmed' : 'Agent Pending'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 md:w-1/4 md:justify-end">
                          <Button 
                            onClick={() => handleApproveRequest(request.id)} 
                            className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-light transition-colors"
                          >
                            Approve
                          </Button>
                          <Button 
                            onClick={() => handleRejectRequest(request.id)} 
                            variant="outline" 
                            className="border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button 
                      variant="link" 
                      onClick={() => setActiveTab('celebrities')} 
                      className="text-[#6A0DAD] hover:underline"
                    >
                      View All Requests
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-8">
              <Card className="rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                  <h2 className="text-xl font-['Playfair_Display']">User Management</h2>
                  <Button className="bg-[#D4AF37] text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-[#e6c76a] transition-colors">
                    Add New User
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">User</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-neutral-200">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover mr-3" />
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-neutral-300">Joined: {user.joinedAt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <Badge className={`px-2 py-1 ${getRoleColor(user.role)} rounded-full text-xs`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`px-2 py-1 ${getStatusColor(user.status)} rounded-full text-xs`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleEditUser(user.id)} 
                                className="text-[#6A0DAD] hover:text-[#8b44c4] transition-colors"
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleChangeRole(user.id)} 
                                className="text-neutral-300 hover:text-primary transition-colors"
                              >
                                <Shield size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteUser(user.id)} 
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 flex justify-between items-center border-t border-neutral-200">
                  <p className="text-neutral-300 text-sm">Showing {Math.min(usersPerPage, users.length)} of {users.length} users</p>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-colors"
                    >
                      <ChevronLeft size={14} />
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="px-3 py-1 rounded bg-primary text-white"
                    >
                      {currentPage}
                    </Button>
                    {totalPages > 1 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setCurrentPage(2)}
                        className="px-3 py-1 rounded border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        2
                      </Button>
                    )}
                    {totalPages > 2 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setCurrentPage(3)}
                        className="px-3 py-1 rounded border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        3
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-colors"
                    >
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Celebrity Accounts Tab */}
            <TabsContent value="celebrities" className="space-y-8">
              <Card className="rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-['Playfair_Display']">Celebrity Status Requests</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {celebrityRequests.map((request) => (
                      <div key={request.id} className="flex flex-col md:flex-row md:items-center p-4 border border-neutral-200 rounded-lg">
                        <div className="flex items-center mb-4 md:mb-0 md:w-1/4">
                          <img src={request.image} alt={request.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                          <div>
                            <p className="font-medium">{request.name}</p>
                            <p className="text-xs text-neutral-300">{request.role}</p>
                          </div>
                        </div>
                        <div className="mb-4 md:mb-0 md:w-1/4">
                          <p className="text-sm text-neutral-300 mb-1">Email</p>
                          <p>{request.email}</p>
                        </div>
                        <div className="mb-4 md:mb-0 md:w-1/4">
                          <p className="text-sm text-neutral-300 mb-1">Verification</p>
                          <div className="flex items-center flex-wrap gap-2">
                            <Badge className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              ID Verified
                            </Badge>
                            <Badge className={`px-2 py-1 ${request.agentConfirmed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} rounded-full text-xs`}>
                              {request.agentConfirmed ? 'Agent Confirmed' : 'Agent Pending'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 md:w-1/4 md:justify-end">
                          <Button 
                            onClick={() => handleApproveRequest(request.id)} 
                            className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-light transition-colors"
                          >
                            Approve
                          </Button>
                          <Button 
                            onClick={() => handleRejectRequest(request.id)} 
                            variant="outline" 
                            className="border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              
              <Card className="rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-['Playfair_Display']">Verified Celebrities</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Celebrity</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Items</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.filter(u => u.role === 'celebrity').map((celeb) => (
                        <tr key={celeb.id} className="border-b border-neutral-200">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <img src={celeb.image} alt={celeb.name} className="w-8 h-8 rounded-full object-cover mr-3" />
                              <div>
                                <p className="font-medium">{celeb.name}</p>
                                <p className="text-xs text-neutral-300">Joined: {celeb.joinedAt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{celeb.email}</td>
                          <td className="py-3 px-4">
                            {/* This would come from actual data in a real app */}
                            <span className="text-sm">{Math.floor(Math.random() * 20) + 5} items</span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`px-2 py-1 ${getStatusColor(celeb.status)} rounded-full text-xs`}>
                              {celeb.status.charAt(0).toUpperCase() + celeb.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleEditUser(celeb.id)} 
                                className="text-[#6A0DAD] hover:text-[#8b44c4] transition-colors"
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => window.open(`/celebrities/${celeb.id}`, '_blank')} 
                                className="text-neutral-300 hover:text-primary transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteUser(celeb.id)} 
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            
            {/* Placeholder for other tabs */}
            <TabsContent value="auctions">
              <Card className="rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-['Playfair_Display'] mb-4">Auction Management</h2>
                <p className="text-neutral-300">Manage all active and upcoming auctions.</p>
                {/* Auction management content would be added here */}
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions">
              <Card className="rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-['Playfair_Display'] mb-4">Transaction History</h2>
                <p className="text-neutral-300">View and manage all platform transactions.</p>
                {/* Transaction content would be added here */}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
