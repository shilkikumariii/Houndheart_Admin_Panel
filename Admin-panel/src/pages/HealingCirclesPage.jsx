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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import {
    Plus,
    Calendar,
    Users,
    Video,
    MapPin,
    MoreVertical,
    CheckCircle2,
    Clock,
    XCircle,
    Eye,
    Edit2,
    Trash2
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const HealingCirclesPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCircle, setSelectedCircle] = useState(null);

    const stats = [
        { label: 'Total Circles', value: '48', icon: <Calendar size={20} />, color: '#8b5cf6' },
        { label: 'Total Participants', value: '1,245', icon: <Users size={20} />, color: '#22c55e' },
        { label: 'Upcoming', value: '12', icon: <Clock size={20} />, color: '#3b82f6' },
        { label: 'This Month', value: '18', icon: <CheckCircle2 size={20} />, color: '#f59e0b' },
    ];

    const circles = [
        { id: 1, title: 'Full Moon Energy Cycle', host: 'Sarah Chen', dateTime: '2024-02-24 7:00 PM', participants: 75, limit: 200, type: 'Virtual', status: 'upcoming' },
        { id: 2, title: 'Morning Gratitude Practice', host: 'Marcus Thompson', dateTime: '2024-02-18 6:00 AM', participants: 32, limit: 100, type: 'Virtual', status: 'completed' },
        { id: 3, title: 'Chakra Alignment Workshop', host: 'Emma Wilson', dateTime: '2024-02-20 5:00 PM', participants: 15, limit: 50, type: 'In-Person', status: 'cancelled' },
        { id: 4, title: 'New Moon Intentions', host: 'Luna Martinez', dateTime: '2024-02-28 7:30 PM', participants: 42, limit: 150, type: 'Virtual', status: 'upcoming' },
    ];

    const handleOpenDetails = (circle) => {
        setSelectedCircle(circle);
        setOpenModal(true);
    };

    return (
        <AdminLayout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: '-0.03em', mb: 1 }}>
                        Healing Circles
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight="500">
                        Manage community healing circles and events
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1.2,
                        bgcolor: '#8b5cf6',
                        '&:hover': { bgcolor: '#7c3aed' },
                        fontWeight: 700,
                        textTransform: 'none'
                    }}
                >
                    Create Circle
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${stat.color}15`, color: stat.color, display: 'flex' }}>
                                {stat.icon}
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight="800" sx={{ textTransform: 'uppercase' }}>{stat.label}</Typography>
                                <Typography variant="h5" fontWeight="800" color="#1e293b">{stat.value}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Paper elevation={0} sx={{ borderRadius: 5, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Host</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Date & Time</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Participants</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#64748b' }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800, color: '#64748b' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {circles.map((circle) => (
                                <TableRow key={circle.id} hover>
                                    <TableCell sx={{ fontWeight: 700, color: '#334155' }}>{circle.title}</TableCell>
                                    <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{circle.host}</TableCell>
                                    <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{circle.dateTime}</TableCell>
                                    <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{circle.participants} / {circle.limit}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b', fontWeight: 700 }}>
                                            {circle.type === 'Virtual' ? <Video size={16} color="#8b5cf6" /> : <MapPin size={16} color="#ec4899" />}
                                            <Typography variant="caption" fontWeight="700">{circle.type}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={circle.status}
                                            size="small"
                                            sx={{
                                                borderRadius: '8px',
                                                fontWeight: 800,
                                                textTransform: 'lowercase',
                                                bgcolor: circle.status === 'upcoming' ? '#f0f9ff' : circle.status === 'completed' ? '#f0fdf4' : '#fef2f2',
                                                color: circle.status === 'upcoming' ? '#0ea5e9' : circle.status === 'completed' ? '#16a34a' : '#ef4444'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <IconButton size="small" onClick={() => handleOpenDetails(circle)}><Eye size={18} color="#94a3b8" /></IconButton>
                                            <IconButton size="small"><Edit2 size={18} color="#94a3b8" /></IconButton>
                                            <IconButton size="small"><Trash2 size={18} color="#ef4444" /></IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Circle Details Modal (Mocking screenshot) */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} PaperProps={{ sx: { borderRadius: 4, width: 450 } }}>
                <DialogTitle sx={{ fontWeight: 800, borderBottom: '1px solid #f1f5f9' }}>Circle Details</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight="700">TITLE</Typography>
                    <Typography variant="body1" fontWeight="800" sx={{ mb: 2 }}>{selectedCircle?.title}</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary" fontWeight="700">DATE</Typography>
                            <Typography variant="body2" fontWeight="700">{selectedCircle?.dateTime.split(' ')[0]}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary" fontWeight="700">TIME</Typography>
                            <Typography variant="body2" fontWeight="700">{selectedCircle?.dateTime.split(' ').slice(1).join(' ')}</Typography>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f3ff', borderRadius: 3, border: '1px solid #ddd6fe' }}>
                        <Typography variant="body2" fontWeight="700" color="#8b5cf6">Circle Rules</Typography>
                        <Typography variant="caption" color="#8b5cf6" fontWeight="600">This healing circle is sacred for behaviorist.</Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid #f1f5f9' }}>
                    <Button onClick={() => setOpenModal(false)} sx={{ fontWeight: 800, color: '#64748b' }}>Close</Button>
                    <Button variant="contained" sx={{ bgcolor: '#8b5cf6', fontWeight: 800, borderRadius: 2 }}>Edit Circle</Button>
                </DialogActions>
            </Dialog>
        </AdminLayout>
    );
};

export default HealingCirclesPage;
