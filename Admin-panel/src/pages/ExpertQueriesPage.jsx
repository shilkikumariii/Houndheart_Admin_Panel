import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Avatar,
    LinearProgress
} from '@mui/material';
import {
    Plus,
    Filter,
    Download,
    Eye,
    CheckCircle2,
    Clock,
    UserPlus,
    Zap,
    MessageSquare,
    ShoppingBag
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const ExpertQueriesPage = () => {
    const stats = [
        { label: 'Monthly Revenue', value: '$4,380', icon: <ShoppingBag size={20} />, color: '#10b981', sub: '438 premium users' },
        { label: 'Expert Queries', value: '156', icon: <MessageSquare size={20} />, color: '#a855f7', sub: '24 pending review' },
        { label: 'Book Waitlist', value: '892', icon: <Zap size={20} />, color: '#ec4899', sub: 'Ready for launch' },
    ];

    const queries = [
        { id: 1, query: 'Energy alignment issues', from: 'Sarah J.', date: '2024-01-15', category: 'Bonding', priority: 'high', status: 'pending' },
        { id: 2, query: 'Meditation guidance needed', from: 'Mike C.', date: '2024-01-14', category: 'Meditation', priority: 'normal', status: 'in-progress' },
        { id: 3, query: 'Chakra syncing questions', from: 'Emma W.', date: '2024-01-13', category: 'Energy', priority: 'low', status: 'completed' },
        { id: 4, query: 'Behavioral guidance', from: 'David B.', date: '2024-01-12', category: 'Behavioral', priority: 'high', status: 'pending' },
    ];

    return (
        <AdminLayout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: '-0.03em', mb: 1 }}>
                        Expert Queries
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight="500">
                        Review and manage community reports
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 5 }}>
                {stats.map((stat, i) => (
                    <Grid item xs={12} md={4} key={i}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: stat.color, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', overflow: 'hidden' }}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</Typography>
                                <Typography variant="h4" fontWeight="800" sx={{ my: 1 }}>{stat.value}</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CheckCircle2 size={12} /> {stat.sub}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'rgba(255, 255, 255, 0.2)', display: 'flex' }}>
                                {stat.icon}
                            </Box>
                            {/* Decorative Circle */}
                            <Box sx={{ position: 'absolute', right: -20, bottom: -20, width: 100, height: 100, borderRadius: '50%', bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="800">Expert Query Management</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button startIcon={<Filter size={18} />} sx={{ color: '#64748b', fontWeight: 700, textTransform: 'none' }}>Filter</Button>
                        <Button startIcon={<Download size={18} />} sx={{ color: '#64748b', fontWeight: 700, textTransform: 'none' }}>Export</Button>
                    </Box>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b', py: 2 }}>Query</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Priority</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Date</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800, color: '#64748b' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {queries.map((q) => (
                                <TableRow key={q.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="700" color="#334155">{q.query}</Typography>
                                        <Typography variant="caption" color="text.secondary" fontWeight="600">From: {q.from}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={q.category} size="small" sx={{ borderRadius: '6px', fontWeight: 700, bgcolor: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }} />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={q.priority}
                                            size="small"
                                            sx={{
                                                borderRadius: '6px',
                                                fontWeight: 800,
                                                bgcolor: q.priority === 'high' ? '#fef2f2' : q.priority === 'normal' ? '#f8fafc' : '#f0fdf4',
                                                color: q.priority === 'high' ? '#ef4444' : q.priority === 'normal' ? '#1e293b' : '#16a34a'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={q.status}
                                            size="small"
                                            sx={{
                                                borderRadius: '6px',
                                                fontWeight: 800,
                                                bgcolor: q.status === 'pending' ? '#fff7ed' : q.status === 'in-progress' ? '#f0f9ff' : '#f0fdf4',
                                                color: q.status === 'pending' ? '#f97316' : q.status === 'in-progress' ? '#0ea5e9' : '#16a34a'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{q.date}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <IconButton size="small"><Eye size={18} color="#94a3b8" /></IconButton>
                                            <Button variant="contained" size="small" sx={{ bgcolor: '#8b5cf6', fontWeight: 800, textTransform: 'none', borderRadius: 2, px: 2 }}>Assign</Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </AdminLayout>
    );
};

export default ExpertQueriesPage;
