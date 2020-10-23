import React, { useState } from "react";

import firebase from 'firebase'

import Client from "../Contentful";

import { makeStyles } from "@material-ui/core/styles";

import { Button, Input, TextField } from '@material-ui/core';

import CloseIcon from "@material-ui/icons/Close";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import DatePicker, { subDays } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import MuiPhoneNumber from 'material-ui-phone-number'

import db from "../firebase";

const BookButton = (props) => {
  const [roomName, setroomName] = useState("");

  const [roomPrice, setroomPrice] = useState();

  const [startDate, setStartDate] = useState();

  const [endDate, setEndDate] = useState();

  const [phone, setPhone] = useState();

  const getRoomData = async () => {
    let response = await Client.getEntry(props.roomId).then((room) => {
      let roomName = room.fields.name;
      setroomName(roomName);

      let roomPrice = room.fields.price;
      setroomPrice(roomPrice);

    });
  };

  getRoomData();

  const submitBooking = (e) => {
    e.preventDefault();

    // get form fields

    let form = document.getElementById("booking-form");

    let name = form.name.value;
    let tel = form.tel.value;
    let startDate = form.startdate.value;
    let endDate = form.enddate.value;
    let bookedRoom = roomName;

    db.collection("bookings").add({
        name,
        tel,
        startDate,
        endDate,
        room: bookedRoom,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("hello")
    })
  };

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "50%",
      [theme.breakpoints.down("md")]: {
        width: "70%",
      },
    },
    cross: {
      cursor: "pointer",
      float: "right",
    },
    bookingForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    formInput: {
        width: '50%',
        margin: '15px 0'
    },
    datepickerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50%'
    },
    dateInput: {
        margin: '15px 0',
    }
  }));

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StartTimeInput = ({ value, onClick }) => (
    <TextField
      className={classes.dateInput}
      onClick={onClick}
      onChange={onClick}
      value={value}
      name="startdate"
      label='From'
      id="start-date"
      autoComplete='off'
      placeholder='choose a date'
      required
    />
  );

  const EndTimeInput = ({ value, onClick }) => (
    <TextField
      className={classes.dateInput}
      onClick={onClick}
      label='To'
      value={value}
      onChange={onClick}
      name="enddate"
      autoComplete='off'
      placeholder='choose a date'
      id="end-date"
      required
    />
  );

    const today = new Date()
    const tomorrow = new Date(today)
    const tomorrowDate = tomorrow.setDate(tomorrow.getDate() + 1)


    let totalPriceText = '';

    if (startDate && endDate) { 
    let Difference_In_Time = endDate.getTime() - startDate.getTime(); 
    
    // To calculate the no. of days between two dates 
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    Difference_In_Days = Math.floor(Difference_In_Days)


    if(Difference_In_Days && roomPrice) {
        let totalPrice = Difference_In_Days * roomPrice;
        totalPriceText = `Total Price: ${totalPrice}$`
    }
    }

  return (
    <>
      <button
        className="btn-primary"
        onClick={handleOpen}
        style={{ marginBottom: 15 }}
      >
        Book {roomName} room
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <CloseIcon onClick={handleClose} className={classes.cross} />
            <h3 style={{marginBottom: 15}}>Book {roomName} room</h3>
            <form
              onSubmit={submitBooking}
              className={classes.bookingForm}
              id="booking-form"
            >
              <TextField className={classes.formInput} id="outlined-basic" name='name' label="Your name" variant="outlined" required />
              <MuiPhoneNumber
                defaultCountry={'us'}
                value={phone}
                className={classes.formInput}
                label='Your phone'
                variant='outlined'
                required
                onChange={e => setPhone(document.getElementById('tel-field').value)}
                inputProps={{
                    name: 'tel',
                    required: true,
                    id: 'tel-field'
                  }}
                />
              <div className={classes.datepickerWrapper}>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<StartTimeInput />}
                    minDate={new Date()}
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    customInput={<EndTimeInput />}
                    placeholderText="Choose a date"
                    minDate={tomorrowDate}
                />
              </div>
              {totalPriceText}
              <Button style={{borderColor: 'black', marginTop: 20}}  variant="outlined" color="primary" type='submit'>Book</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default BookButton;
