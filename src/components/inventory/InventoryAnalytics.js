import React, {useEffect } from 'react';
import { getInventoryStats } from '../../actions/adminActions';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {useDispatch, useSelector } from 'react-redux';

const InventoryAnalytics = () => {

    const dispatch = useDispatch();
    const {totalDevices, instockDevices, outstockDevices, brokenDevices} = useSelector(state => state.inventoryStats);

    useEffect(() => {   
        dispatch(getInventoryStats())
    }, [dispatch]);


    const data = [
        { name: 'In Stock', value: instockDevices },
        { name: 'Out of Stock', value: outstockDevices },
        { name: 'Broken', value: brokenDevices },
      ];

    
      
    const COLORS = ['#216d41','#ffa600','#ff0000'];

    const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

  return (
    <div className="home-content">
            <div className="overview-boxes">
                <div className="box box2">
                    <div className="left-side">
                        <div className="box_topic">In Stock</div>
                        <div className="number">{instockDevices && instockDevices > 10 ? instockDevices : '0'+instockDevices}</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt down"></i>
                            <span className="text">Up from Yesterday</span>
                        </div>
                    </div>
                    <i className="bx bx-user cart"></i>
                </div>

                <div className="box box1">
                    <div className="left-side">
                        <div className="box_topic">Assigned Devices</div>
                        <div className="number">{outstockDevices && outstockDevices > 10 ? outstockDevices : '0'+outstockDevices}</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt down"></i>
                            <span className="text">Up from Yesterday</span>
                        </div>
                    </div>
                    <i className="bx bx-devices cart two"></i>
                </div>

                <div className="box box0">
                    <div className="left-side">
                        <div className="box_topic">Broken</div>
                        <div className="number">{brokenDevices && brokenDevices > 10 ? brokenDevices : '0'+brokenDevices}</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt down"></i>
                            <span className="text">Up from Yesterday</span>
                        </div>
                    </div>
                    <i className="bx bx-user cart three"></i>
                </div>

                <div>
                <PieChart width={200} height={170}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                </div>
            </div>
        <br />
    </div>
  )
}

export default InventoryAnalytics