import React from 'react'
import styled from '@emotion/styled';


interface StatusFiller {
  showStatusOfTheShip: boolean;
}

interface isCompleted {
    isShipAtDeparture: boolean;
    reached: boolean;
}

type Props = {
    status: number;
    portOfDepart: string;
    portOfArrival: string;
    message: string;
}

const Ports = styled.div`
  display:flex;
  justify-content:space-between;
  padding:0 10% ;
  margin:auto;
`
const Wrapper = styled.div`
margin:auto;
height:200px;
position:relative;
justify-content:center;
`
const PinWrapper = styled.div`
padding:0;
margin:0;
`
const Pin = styled.div`
  background-color: #253d5e;
  display:flex;
  justify-content:center;
  align-items:center;
  width:50px;
  height:50px;
  transform: translate(0%,0%) rotate(-45deg);
  border-radius:50% 50% 50% 0%;
  @media (max-width: 800px) {
    width:30px;
    height:30px;
      }
`
const Circle = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  background-color: #f5f2f6;
  width:75%;
  height:75%;
  margin: auto ;
  border-radius:50%;
`
const Boat = styled.div`
background-color: #f5f2f6;
border-bottom:10px solid #555;
border-left:0 3px solid transparent;
transform: rotate(-135deg);
height:0;
width:50%;
`
const Port = styled.div<isCompleted>`
  background-color: ${props => (props.reached) ? "#253d5e" : props.isShipAtDeparture ? "#253d5e" : "#76aaf3"} ;
  width:30px;
  height:30px;
  border-radius:50%;
`
const Dot = styled.div<StatusFiller>`
  background-color: ${props => (props.showStatusOfTheShip) ? "#253d5e" : "#76aaf3"};
  width:20px;
  height:20px;
  border-radius:50%;
`
const Dots = styled.div`
margin:auto;
display:grid;
height:80%;
width:80%;
align-items:center;
justify-items:center;
grid-template-columns:repeat(11,1fr);
grid-template-rows:minmax(30px,auto);
`
const PinPosition = styled.div`
  margin:auto;
  height:100%;
  width:100%;
  display:grid;
  align-items:end;
  justify-items:center;
`
const Message = styled.h3`
margin:1%;
text-align:center;
font-style:bold;
font-size:30px;
`


const VoyageProgressBar = ({ status, message, portOfDepart, portOfArrival }:Props) => {

    const voyageTravelAxis: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return (
        <Wrapper>
            <Message>{message}</Message>
            <Dots>
                {voyageTravelAxis.map((s, i) => {
                  return <PinPosition key={i}>
                          {i === Math.ceil(status / 10) ?
                              <PinWrapper>
                                  <Pin>
                                      <Circle>
                                          <Boat></Boat>
                                      </Circle>
                                  </Pin>
                              </PinWrapper> : ""}
                          {(i === 0 || i === voyageTravelAxis.length - 1)    
                              ? <Port isShipAtDeparture={i === 0 ? true : false} reached={i === Math.ceil(status / 10) ? true : false} />
                              : <Dot showStatusOfTheShip={i <= Math.ceil(status / 10) ? true : false} />}
                          </PinPosition>
                })}
            </Dots>
            <Ports>
                <p>{portOfDepart}</p>
                <p>{portOfArrival}</p>
            </Ports>

        </Wrapper>
    )
}

export default VoyageProgressBar