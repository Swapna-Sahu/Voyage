import React, { useState } from 'react'
import styled from '@emotion/styled'

const InputForm = styled.form`
padding-left:15%;
justify-items:right;
align-items:right;
display:flex;
flex-direction:column;
background-color:#101e9f;
font-size:20px;
`

const Label = styled.label`
margin-top:2%;
display:block;
font-weight:bold;
padding-bottom:10px;
color:white;
`
const ErrorText = styled.p`
  color:red;
  background-color:white;
  display:block;
` 
const H1 = styled.h1`
  color:blue;
  text-align:center;
  text-decoration:underline;
`

type Props = {
    portOfDepart: string;
    portOfArrival: string;
    departureTime: Date;
    arrivalTime:Date;
    handlePortOfDepart: (e:React.ChangeEvent<HTMLInputElement>) => void; 
    handlePortOfArrival: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleDepartureTime: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleArrivalTime: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

const TravelDetails = ({ 
    portOfDepart, 
    portOfArrival ,
    departureTime, 
    arrivalTime, 
    handlePortOfDepart, 
    handlePortOfArrival,
    handleDepartureTime,
    handleArrivalTime}:Props) => {

    const [errorText, setErrorText] = useState<string>("");
    
    return (
        <header>
            <H1>Voyage Status Information</H1>
            <InputForm>
                <div>
                    <Label>Enter port name and time of departure.</Label>
                    <input
                        value={portOfDepart}
                        onChange={handlePortOfDepart}
                        placeholder="Port name of Depart."
                        className="input"
                        onBlur={()=>!portOfDepart ?setErrorText('Please enter the port of departure') : setErrorText('')}
                    />
                    <input
                        type="datetime-local"
                        defaultValue={departureTime.toLocaleTimeString("en-au")}
                        onChange={handleDepartureTime}
                    />
                </div>
                <div>
                    <Label>Enter port name and time of arrival.</Label>
                    <input
                        value={portOfArrival}
                        onChange={handlePortOfArrival}
                        placeholder="Port name of arrival."
                        onBlur={()=>!portOfArrival ?setErrorText('Please enter the port of arrival') : setErrorText('')}
                    />
                    <input
                        type="datetime-local"
                        defaultValue={arrivalTime.toLocaleTimeString("en-au")}
                        onChange={handleArrivalTime}
                        min={departureTime.toLocaleDateString('en-au')}
                    />
                </div>
                <ErrorText>{errorText}</ErrorText>
            </InputForm>
        </header>
    )
}

export default TravelDetails