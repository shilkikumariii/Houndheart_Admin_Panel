import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Card,
    CardContent,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Avatar
} from '@mui/material';
import {
    Users,
    Heart,
    BookOpen,
    Zap,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    MessageCircle,
    ShoppingBag,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from '../components/AdminLayout';
import apiService from '../services/apiService';

const StatCard = ({ title, value, icon, trend, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: delay }}
    >
        <Card
            elevation={0}
            sx={{
                height: '100%',
                border: '1px solid #e2e8f0',
                borderRadius: 4,
                p: 3,
                '&:hover': {
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                    transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="body2" color="#64748b" fontWeight="600" sx={{ mb: 1.5 }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: '-0.02em', color: '#1e293b', mb: 1 }}>
                        {value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {trend}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: color,
                        color: 'white',
                        display: 'flex',
                        boxShadow: `0 8px 16px -4px ${color}40`
                    }}
                >
                    {icon}
                </Box>
            </Box>
        </Card>
    </motion.div>
);

const AdminDashboardPage = () => {
    // These values match the screenshot provided by the user
    const stats = [
        { title: 'Active Members', value: '2,347', icon: <Users size={22} />, trend: '+12% this month', color: '#6366f1', delay: 0.1 },
        { title: 'Stories Shared', value: '1,856', icon: <Heart size={22} />, trend: '+9% this month', color: '#ec4899', delay: 0.2 },
        { title: 'Healing Circles', value: '142', icon: <Calendar size={22} />, trend: '+23% this month', color: '#f97316', delay: 0.3 },
        { title: 'Avg. Bond Growth', value: '+12%', icon: <TrendingUp size={22} />, trend: '+2% this month', color: '#22c55e', delay: 0.4 },
    ];

    const recentActivities = [
        { id: 1, user: 'Sarah Chen', action: 'posted in #ChakraAlignment', time: '2 minutes ago', avatar: <MessageCircle size={16} />, color: '#f5f3ff', iconColor: '#8b5cf6' },
        { id: 2, user: 'Marcus Thompson', action: 'joined Full Moon Healing Circle', time: '15 minutes ago', avatar: <Calendar size={16} />, color: '#fff7ed', iconColor: '#f97316' },
        { id: 3, user: 'Emma Wilson', action: 'reported a post', time: '23 minutes ago', avatar: <ArrowUpRight size={16} />, color: '#fef2f2', iconColor: '#ef4444' },
        { id: 4, user: 'James Foster', action: 'created new account', time: '1 hour ago', avatar: <Users size={16} />, color: '#f0fdf4', iconColor: '#22c55e' },
        { id: 5, user: 'Luna Martinez', action: 'shared a story', time: '2 hours ago', avatar: <MessageCircle size={16} />, color: '#f5f3ff', iconColor: '#8b5cf6' },
    ];

    return (
        <AdminLayout>
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: '-0.03em', mb: 0.5, color: '#1e293b' }}>
                        Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="600">
                        Welcome back! Here's what's happening in your community.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            bgcolor: 'white',
                            border: '1px solid #e2e8f0',
                            px: 2,
                            py: 1,
                            borderRadius: 3
                        }}
                    >
                        <Calendar size={16} color="#64748b" />
                        <Typography variant="body2" fontWeight="600" color="#334155">Oct 24 - Oct 31, 2023</Typography>
                    </Box>
                </Box>
            </Box>

            <Grid container spacing={4} sx={{ mb: 5 }}>
                {stats.map((stat, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                        <StatCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* Main Visuals Section */}
            {/* Charts Section */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} lg={7}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', height: '100%' }}>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" fontWeight="800">Community Growth</Typography>
                        </Box>
                        {/* Refined CSS Line Chart with Y-axis */}
                        <Box sx={{ height: 300, position: 'relative', mt: 2, display: 'flex', px: 2, ml: 4 }}>
                            {/* Y-Axis Labels */}
                            <Box sx={{ position: 'absolute', left: -45, top: 0, bottom: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', pr: 1 }}>
                                {[2400, 1800, 1200, 600, 0].map(v => <Typography key={v} variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '11px' }}>{v}</Typography>)}
                            </Box>

                            <Box sx={{ flexGrow: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ flexGrow: 1, position: 'relative', borderLeft: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 0.1, zIndex: 0 }}>
                                        {[1, 2, 3, 4].map(i => <Box key={i} sx={{ borderTop: '1px dashed #64748b', width: '100%' }} />)}
                                    </Box>
                                    <svg viewBox="0 0 800 260" style={{ width: '100%', height: '100%', overflow: 'visible', position: 'relative', zIndex: 1 }}>
                                        {/* Line 1 (Members) */}
                                        <path d="M0,180 Q150,165 300,140 T600,100 T800,80" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
                                        {[0, 150, 300, 450, 600, 800].map((x, i) => <circle key={i} cx={x} cy={[180, 170, 140, 120, 100, 80][i]} r="4" fill="white" stroke="#8b5cf6" strokeWidth="2" />)}

                                        {/* Line 2 (Posts) */}
                                        <path d="M0,220 Q200,200 400,180 T800,140" fill="none" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
                                        {[0, 200, 400, 600, 800].map((x, i) => <circle key={i} cx={x} cy={[220, 200, 180, 160, 140][i]} r="4" fill="white" stroke="#ec4899" strokeWidth="2" />)}
                                    </svg>
                                </Box>
                                {/* X-Axis Labels */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1.5, px: 1 }}>
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => <Typography key={m} variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '11px' }}>{m}</Typography>)}
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 4, mt: 3, justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#8b5cf6' }} /><Typography variant="caption" fontWeight="700">Members</Typography></Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ec4899' }} /><Typography variant="caption" fontWeight="700">Posts</Typography></Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', height: '100%' }}>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" fontWeight="800">Activity by Time</Typography>
                        </Box>
                        <Box sx={{ height: 300, position: 'relative', display: 'flex', px: 2, ml: 4 }}>
                            {/* Y-Axis Labels */}
                            <Box sx={{ position: 'absolute', left: -45, top: 0, bottom: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', pr: 1 }}>
                                {[100, 75, 50, 25, 0].map(v => <Typography key={v} variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '11px' }}>{v}</Typography>)}
                            </Box>

                            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', px: 1, borderLeft: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', pb: 0, position: 'relative' }}>
                                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 0.1, zIndex: 0 }}>
                                        {[1, 2, 3].map(i => <Box key={i} sx={{ borderTop: '1px dashed #64748b', width: '100%' }} />)}
                                    </Box>
                                    {[15, 10, 45, 80, 65, 95].map((h, i) => (
                                        <Box key={i} sx={{ width: '12%', height: `${h}%`, bgcolor: '#8b5cf6', borderRadius: '6px 6px 0 0', position: 'relative', zIndex: 1 }} />
                                    ))}
                                </Box>
                                {/* X-Axis Labels */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1.5 }}>
                                    {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map(t => <Typography key={t} variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '10px' }}>{t}</Typography>)}
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Bottom Row */}
            <Grid container spacing={4}>
                <Grid item xs={12} lg={4}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', height: '100%' }}>
                        <Typography variant="h6" fontWeight="800" mb={4}>Trending Topics</Typography>
                        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', mb: 6 }}>
                            <Box sx={{ width: 160, height: 160, borderRadius: '50%', border: '20px solid #f8fafc', position: 'relative' }}>
                                <Box sx={{ position: 'absolute', top: -20, left: -20, right: -20, bottom: -20, borderRadius: '50%', border: '20px solid transparent', borderTopColor: '#8b5cf6', borderLeftColor: '#d946ef', borderRightColor: '#10b981', borderBottomColor: '#f97316', transform: 'rotate(45deg)' }} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            {[
                                { label: 'Chakra Alignment', val: 124, color: '#8b5cf6' },
                                { label: 'Full Moon Ritual', val: 98, color: '#d946ef' },
                                { label: 'Healing Journey', val: 76, color: '#10b981' },
                                { label: 'Energy Sync', val: 63, color: '#f97316' }
                            ].map(topic => (
                                <Box key={topic.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: topic.color }} />
                                        <Typography variant="body2" fontWeight="700" color="#64748b">{topic.label}</Typography>
                                    </Box>
                                    <Typography variant="body2" fontWeight="800" color="#1e293b">{topic.val}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', height: '100%' }}>
                        <Typography variant="h6" fontWeight="800" mb={4}>Recent Activity</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                            {recentActivities.map((activity) => (
                                <Box key={activity.id} sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 2,
                                            bgcolor: activity.color,
                                            color: activity.iconColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}
                                    >
                                        {activity.avatar}
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2" fontWeight="600" color="#334155">
                                            <Box component="span" sx={{ fontWeight: 800 }}>{activity.user}</Box> {activity.action}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" fontWeight="600">{activity.time}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default AdminDashboardPage;
