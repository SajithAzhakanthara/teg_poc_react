import {useState,useEffect, useLayoutEffect} from "react";
import "./ListingTwo.css";




const ListingTwo = () => {
    
const [dataOne, setDataOne] = useState(
    localStorage.getItem('dataOne')
);
const [dataTwo, setDataTwo] = useState(
    localStorage.getItem('dataTwo')
);
const [dataThree, setDataThree] = useState(
    localStorage.getItem('dataThree')
);

useEffect(()=>{
    dataOne && console.log(JSON.parse(dataOne));
    dataTwo && console.log(JSON.parse(dataTwo));
    dataThree && console.log(JSON.parse(dataThree));
})



    return (
        <div className="listingTwo">
            <div className="container">
                {
                    (dataOne && JSON.parse(dataOne).some(obj=>obj.RuleName === "PSC Name:"))?
                    <h4>Psc Details</h4>:
                    (dataTwo && JSON.parse(dataTwo).some(obj=>obj.RuleName === "PSC Name:"))?
                    <h4>Psc Details</h4>:
                    (dataThree && JSON.parse(dataThree).some(obj=>obj.RuleName === "PSC Name:"))?
                    <h4>Psc Details</h4>:
                    <h4>Directors details</h4>
                }
               
               {
                (dataOne && JSON.parse(dataOne).some(obj=>obj.RuleName === "PSC Name:"))?
                <div className="guid-one">
                    <ul>
                        {
                            dataOne && JSON.parse(dataOne).map(data=>{
                                return(
                                   (data.description && data.RuleName ) && <li>
                                        <span>{data.RuleName}</span>
                                        <span>{data.description}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>:
                (dataTwo && JSON.parse(dataTwo).some(obj=>obj.RuleName === "PSC Name:"))?
                <div  className="guid-one">
                    <ul>
                        {
                            dataOne && JSON.parse(dataTwo).map(data=>{
                                return(
                                    (data.description && data.RuleName ) &&  <li>
                                        <span>{data.RuleName}</span>
                                        <span>{data.description}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>:
                (dataThree && JSON.parse(dataThree).some(obj=>obj.RuleName === "PSC Name:"))?
                <div  className="guid-one">
                    <ul>
                        {
                            dataThree && JSON.parse(dataThree).map(data=>{
                                return(
                                    (data.description && data.RuleName ) &&  <li>
                                        <span>{data.RuleName}</span>
                                        <span>{data.description}</span>
                                    </li>
                                );
                            })
                        }
                    </ul> 
                </div>:
                dataOne?
                <div>
                       {
                        (dataOne && JSON.parse(dataOne).some(obj=>obj.description === "Director")) &&
                        <div className="guid-one">
                                <ul>
                                    {
                                        dataOne && JSON.parse(dataOne).map(data=>{
                                            return(
                                                (data.description && data.RuleName ) &&  <li>
                                                    <span>{data.RuleName}</span>
                                                    <span>{data.description}</span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul> 
                        </div>
                        }
                        {(dataTwo && JSON.parse(dataTwo).some(obj=>obj.description === "Director")) &&
                        <div className="guid-one">
                                <ul>
                                    {
                                        dataTwo && JSON.parse(dataTwo).map(data=>{
                                            return(
                                                (data.description && data.RuleName ) &&  <li>
                                                    <span>{data.RuleName}</span>
                                                    <span>{data.description}</span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul> 
                        </div>
                        }
                        {
                        (dataThree && JSON.parse(dataThree).some(obj=>obj.description === "Director")) &&
                        <div>
                                <ul>
                                    {
                                        dataTwo && JSON.parse(dataThree).map(data=>{
                                            return(
                                                (data.description && data.RuleName ) &&  <li>
                                                    <span>{data.RuleName}</span>
                                                    <span>{data.description}</span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul> 
                        </div>
                        }
                  
                </div>:
                <div></div>
               }
                
            </div>
        </div>
    );
}

export default ListingTwo;