import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    TextField,
    Switch,
    FormControlLabel,
    Checkbox,
    Divider
} from '@mui/material';
import {
    ShoppingBag,
    MessageSquare,
    Zap,
    CheckCircle2,
    Settings,
    Crown
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const SettingsPage = () => {
    const stats = [
        { label: 'Monthly Revenue', value: '$4,380', icon: <ShoppingBag size={20} />, color: '#10b981', sub: '438 premium users' },
        { label: 'Expert Queries', value: '156', icon: <MessageSquare size={20} />, color: '#a855f7', sub: '24 pending review' },
        { label: 'Book Waitlist', value: '892', icon: <Zap size={20} />, color: '#ec4899', sub: 'Ready for launch' },
    ];

    return (
        <AdminLayout>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: '-0.03em', mb: 1 }}>
                    Settings
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 5 }}>
                {stats.map((stat, i) => (
                    <Grid item xs={12} md={4} key={i}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: stat.color, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                                <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</Typography>
                                <Typography variant="h4" fontWeight="800" sx={{ my: 1 }}>{stat.value}</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CheckCircle2 size={12} /> {stat.sub}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'rgba(255, 255, 255, 0.2)', display: 'flex' }}>
                                {stat.icon}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                            <Settings size={20} color="#a855f7" />
                            <Typography variant="h6" fontWeight="800">Platform Settings</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box>
                                <Typography variant="body2" fontWeight="700" mb={1}>Maintenance Mode</Typography>
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    label={<Typography variant="caption" fontWeight="600" color="text.secondary">Enable maintenance mode</Typography>}
                                />
                            </Box>
                            <Box>
                                <Typography variant="body2" fontWeight="700" mb={1}>New Registrations</Typography>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked size="small" sx={{ '&.Mui-checked': { color: '#000' } }} />}
                                    label={<Typography variant="caption" fontWeight="600" color="text.secondary">Allow new user registrations</Typography>}
                                />
                            </Box>
                            <Box>
                                <Typography variant="body2" fontWeight="700" mb={1}>Book Sales</Typography>
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    label={<Typography variant="caption" fontWeight="600" color="text.secondary">Enable Sacred Guide sales</Typography>}
                                />
                            </Box>

                            <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#a855f7', py: 1.5, borderRadius: 3, fontWeight: 800, textTransform: 'none' }}>
                                Save Settings
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                            <Crown size={20} color="#d946ef" />
                            <Typography variant="h6" fontWeight="800">Pricing Settings</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box>
                                <Typography variant="caption" fontWeight="700" color="text.secondary">Premium Plan Price</Typography>
                                <TextField fullWidth size="small" defaultValue="9.99" sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc' } }} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="700" color="text.secondary">Premium+ Plan Price</Typography>
                                <TextField fullWidth size="small" defaultValue="19.99" sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc' } }} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="700" color="text.secondary">Sacred Guide Price</Typography>
                                <TextField fullWidth size="small" defaultValue="12.95" sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc' } }} />
                            </Box>

                            <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#d946ef', py: 1.5, borderRadius: 3, fontWeight: 800, textTransform: 'none', '&:hover': { bgcolor: '#c026d3' } }}>
                                Update Pricing
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default SettingsPage;
