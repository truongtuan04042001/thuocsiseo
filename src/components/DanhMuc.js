import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//import tune_danhmuc from '../public/tune-danhmuc.png';
import MuiListItem from "@material-ui/core/ListItem";
import { API_URL } from '../constants/constants'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: "#F4F7FC",

    },
    nested: {
        paddingLeft: theme.spacing(4),
        padding: 0,
        marginBottom: 5,
        "&:hover": {
            backgroundColor: "#F4F7FC"
        }
    },
}));

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "#F4F7FC",
            color: "green"
        },
        "&$selected:hover": {
            backgroundColor: "#F4F7FC",
            color: "green",
            fontWeight: 'bold',
            textDecorationLine: 'underline'
        },
        "&:hover": {
            backgroundColor: "#F4F7FC"
        }
    },
    selected: {}
})(MuiListItem);

export default function DanhMuc(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [open1, setOpen1] = React.useState(false);
    const [nhomhang, setNhomhang] = useState([]);
    const [hsx, setHsx] = useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState();
    // useEffect(()=>{
    //     if(window.innerWidth < 500){
    //         setOpen(false);
    //         setOpen1(false);
    //     }
    // });
    useEffect(async () => {

        fetch(API_URL + '/danhmucnhomhang', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })

        })
            .then((response) => response.json())
            .then(data => {
                // console.log(data)

                setNhomhang(data)
            })


    }, []);

    useEffect(async () => {

        fetch(API_URL + '/danhmuchsx', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })

        })
            .then((response) => response.json())
            .then(data => {
                // console.log(data)
                setHsx(data)
            })
    }, []);
    const sendData = (text) => {
        props.parentCallback(text);
        if (window.innerWidth < 500) {
            setOpen(false);
            setOpen1(false);
            window.scrollTo({
                top: 400,
                left: 0,
                behavior: "smooth"
            })

        }
        else {
            window.scrollTo({
                top: 200,
                left: 0,
                behavior: "smooth"
            })

        }
    };
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick1 = () => {
        setOpen1(!open1);
    };


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <div style={{ width: '20%', margin: 10 }} className="danh_muc">
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                {/* <img className='menu-a-img' src={tune_danhmuc} alt="Bộ lọc tìm kiếm"></img> */}
                <div className='title_category' style={{ marginLeft: 7, fontWeight: 500 }}>Bộ Lọc Tìm Kiếm</div>
            </div>
            <hr style={{ margin: 15, marginBottom: 10 }}></hr>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Nhóm thuốc" />
                    {open ? <ExpandLess style={{ color: '#027525' }} /> : <ExpandMore style={{ color: '#027525' }} />}
                </ListItem>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} selected={selectedIndex === -1}
                            onClick={(event) => handleListItemClick(event, -1)}>
                            <ListItemText primary="Tất Cả Sản Phẩm" onClick={() => {
                                sendData("Tất Cả Sản Phẩm")
                            }} />
                        </ListItem>

                        {
                            nhomhang.map((x, i) => {
                                return (
                                    <ListItem key={i} button className={classes.nested} selected={selectedIndex === i}
                                        onClick={(event) => handleListItemClick(event, i)}>
                                        <ListItemText primary={x.TenNH} onClick={() => {
                                            sendData(x.TenNH)
                                        }} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Collapse>
                <hr style={{ margin: 15, marginBottom: 20 }}></hr>

                <ListItem button onClick={handleClick1}>
                    <ListItemText primary="Nhà Sản Xuất" />
                    {open1 ? <ExpandLess style={{ color: '#027525' }} /> : <ExpandMore style={{ color: '#027525' }} />}
                </ListItem>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} selected={selectedIndex === -1}
                            onClick={(event) => handleListItemClick(event, -1)}>
                            <ListItemText primary="Tất Cả Sản Phẩm" onClick={() => {
                                sendData('Tất Cả Sản Phẩm');
                            }} />
                        </ListItem>
                        {

                            hsx.map((x, i) => {
                                return (
                                    <ListItem key={i} button className={classes.nested}>
                                        <ListItemText primary={x.TenHangSX} onClick={() => {
                                            sendData(x.TenHangSX)
                                        }} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Collapse>
            </List>
        </div>
    )
}