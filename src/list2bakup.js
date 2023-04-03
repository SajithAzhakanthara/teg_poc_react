import "./ListingTwo.css";
import { useState,useEffect } from "react";
import LoaderImg from '../../assets/loading-gif.gif';

const ListingTwo = () => {

    const [data,setData] = useState(
        localStorage.getItem('cdata') && JSON.parse(localStorage.getItem('cdata'))
    )
    const [dirData,setDirData] = useState();
    const [loading,setLoading] = useState(false);
    const [modalShow,setModalShow] = useState(false);
    const [birthDate,setBirthDate] = useState();
    const [error,setError] = useState(false)

    const [shareHolderName,setShareHolderName] = useState(
        localStorage.getItem('shareholders') && JSON.parse(localStorage.getItem('shareholders'))
    );

useEffect(()=>{

},[])

const modalCloseHandler = () => {
    setModalShow(false)
}

function convertDate(dateStringValue){
    const dateString = dateStringValue;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    setBirthDate(day + "-" + month + "-" + year)
}


function fetchPersonDetails(country, id) {
    const url = `http://ec2-35-153-33-250.compute-1.amazonaws.com:8080/TegPoc/directorssearch?countries=${country}&peopleId=${id}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        data.directors.map(data=>{
            setDirData(data);
            const dateValue = data.dateOfBirth;
            const dateStringValue = dateValue.toString();
            convertDate(dateStringValue);
        })
      })
      .catch(error => {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }
  


const onClickHandler = (e) => {
    setModalShow(true);
    const id = e.target.id
    const country = localStorage.getItem('country');
    setLoading(true);
    if (id == ""){
        setLoading(false);
        setError(true);
    }else {
        id && fetchPersonDetails(country,id);
        setError(false);
    }
    
}

// console.log(dirData?.directors);

    return(
        <div className="listingTwo">
            <div className="container">
                <div className="listingTwo-inner">
                    <div className="company-detail-outer">
                        <h3>Company details</h3>
                        <ul>
                            <li><span>Company name</span><span>:&nbsp;&nbsp;{data.report.companySummary.businessName}</span></li>
                            <li><span>Company number</span><span>:&nbsp;&nbsp;{data.report.companySummary.companyNumber}</span></li>
                            <li><span>Registration number</span><span>:&nbsp;&nbsp;{data.report.companySummary.companyRegistrationNumber}</span></li>
                            <li><span>Company status</span><span>:&nbsp;&nbsp;{data.report.companySummary.companyStatus.status}</span></li>
                            <li><span>Country</span><span>:&nbsp;&nbsp;{data.report.companySummary.country}</span></li>
                        </ul>
                    </div>
                    <div className="director-list-outer">
                        {data?.report?.directors && <h3>Company directors</h3>}
                        <ul>
                            {
                                data?.report?.directors?.currentDirectors && (data.report.directors.currentDirectors).map((item,index)=>{
                                    return(
                                        <li key={item.id}><span>{index + 1}&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</span><button onClick={onClickHandler} id={item.id}>View details</button></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="director-list-outer">
                        {shareHolderName?.shareHolders && <h3>Share holders</h3>}
                        <ul>
                            {
                                shareHolderName?.shareHolders && (shareHolderName?.shareHolders).map((item,index)=>{
                                    return(
                                        <li key={item.id}><span>{index + 1}&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</span><button onClick={onClickHandler} id={item.id}>View details</button></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            { modalShow == false ? "" :
                <div className="dir-detail-popup">
                <div className="dir-detail-popup-dialog">
                    <button onClick={modalCloseHandler} className="close">x</button>
                    {
                        loading &&                     
                        <div className="modal-loader">
                           <img src={LoaderImg} className="modal-loader-img"/>
                        </div>
                    }
                    
                    {
                        error == false ? 
                        <div>
                        <h4>Director details</h4>
                        <ul>
                        
                        {dirData?.firstName && <li>
                            <div>First name</div><div>:&nbsp;&nbsp;&nbsp;&nbsp;{dirData.firstName}</div>
                        </li>}

                        {dirData?.lastName && <li>
                            <div>Last name</div><div>:&nbsp;&nbsp;&nbsp;&nbsp;{dirData.lastName}</div>
                        </li>}

                        {dirData?.lastName && <li>
                            <div>Date of birth</div><div>:&nbsp;&nbsp;&nbsp;&nbsp;{birthDate}</div>
                        </li>}

                        {dirData?.localDirectorNumber && <li>
                            <div>Local director no</div><div>:&nbsp;&nbsp;&nbsp;&nbsp;{dirData.localDirectorNumber}</div>
                        </li>}
                            
                    </ul>

                    <h5>Address</h5>
                        <ul>
                        
                        {dirData?.address?.houseNo && <li>
                            <div>House no</div><div>:&nbsp;&nbsp;&nbsp;&nbsp;{dirData.address.houseNo}</div>
                        </li>}

                        {dirData?.address?.street && <li>
                            <div>Street</div><div>:&nbsp;&nbsp;&nbsp;&nbsp;{dirData.address.street}</div>
                        </li>}

                        {dirData?.address?.province && <li>
                            <div>Province</div><div>:&nbsp;&nbsp;&nbsp;&nbsp;{dirData.address.province}</div>
                        </li>}

                        {dirData?.address?.city && <li>
                            <div>City</div><div>:&nbsp;&nbsp;&nbsp;&nbsp;{dirData.address.city}</div>
                        </li>}

                        {dirData?.address?.postCode && <li>
                            <div>Postcode</div><div>:&nbsp;&nbsp;&nbsp;&nbsp;{dirData.address.postCode}</div>
                        </li>}
                            
                    </ul>

                    </div> :
                    <p className="modal-error">There is no data regarding this person</p>
                    }
                </div>
            </div>
            }
        </div>
    );
}

// export default ListingTwo;