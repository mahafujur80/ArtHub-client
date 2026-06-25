'use client';

import { getAllRevenue, getAllSoldArtworks, getAllUsers, getPieChartData } from "@/lib/api/admin";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
    FaUsers,
    FaPaintBrush,
    FaCartArrowDown,
    FaMoneyBillWave,
} from "react-icons/fa";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
    CartesianGrid,
} from "recharts";



const salesData = [
    { month: "Jan", sales: 1000 },
    { month: "Feb", sales: 1400 },
    { month: "Mar", sales: 2000 },
    { month: "Apr", sales: 1700 },
    { month: "May", sales: 2200 },
    { month: "Jun", sales: 1600 },
];



const COLORS = ["#f97316", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6", "#f59e0b", "#06b6d4", "#ec4899", "#84cc16", "#6366f1", "#14b8a6", "#a855f7"];

export default function AdminOverview() {

    const [users, setUsers] = useState([])
    const [sold, setSold] = useState([])
    const [pieData, setPieData] = useState([])
    const [revenue, setRevenue] = useState(0)

    useEffect(() => {
        const getPieData = async () => {
            const res = await getPieChartData()
            setPieData(res)
        };
        const getAllUser = async () => {
            const res = await getAllUsers("admin")
            setUsers(res.data)
        };
        const getSold = async () => {
            const res = await getAllSoldArtworks()
            setSold(res)
        };
        const fetchAllRevenue = async () => {
            const res = await getAllRevenue()
            setRevenue(res)
        };
        getPieData();
        getAllUser();
        getSold();
        fetchAllRevenue();

    }, [])

    const totalArtist = users.filter(user => user.role === 'artist').length

    const stats = [
        { title: "Total Users", value: users.length, icon: FaUsers },
        { title: "Total Artists", value: totalArtist, icon: FaPaintBrush },
        { title: "Artworks Sold", value: sold.length, icon: FaCartArrowDown },
        { title: "Total Revenue", value: `$${revenue}`, icon: FaMoneyBillWave },
    ];

    return (
        <div className="space-y-8 p-4">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Analytics Overview
                </h1>
                <p className="text-gray-500 mt-2">
                    Track users, artists, sales, revenue, and artwork insights.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-100 p-6 
                   hover:shadow-md hover:border-orange-200 
                   transition-all duration-200"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-50 
                      flex items-center justify-center mb-5">
                                <Icon className="text-xl text-orange-500" />
                            </div>

                            <p className="text-sm text-gray-500 mb-1">
                                {stat.title}
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900">
                                {stat.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <div className="bg-white rounded-2xl border border-orange-100 p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Sales Performance
                        </h2>

                        <p className="text-sm text-gray-500">
                            Monthly artwork sales overview
                        </p>
                    </div>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={salesData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "none",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                                    }}
                                />

                                <Legend />

                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#f97316"
                                    strokeWidth={4}
                                    dot={{ r: 5 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-2xl border border-orange-100 p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Artwork Categories
                        </h2>

                        <p className="text-sm text-gray-500">
                            Distribution of artworks by category
                        </p>
                    </div>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={50}
                                    outerRadius={90}
                                    label={({ name, percent }) =>
                                        `${name} (${(percent * 100).toFixed(0)}%)`
                                    }
                                >
                                    {pieData.map((item, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    formatter={(value) => [`${value}`, "Count"]}
                                />

                                <Legend
                                    verticalAlign="bottom"
                                    align="center"
                                    iconType="circle"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}