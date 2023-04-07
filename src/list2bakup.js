import "./ListingTwo.css";
import { useState,useEffect } from "react";
import LoaderImg from '../../assets/loading-gif.gif';

const ListingTwo = () => {

    const [companydata,setCompanyData] = useState(
        localStorage.getItem('cdata') && JSON.parse(localStorage.getItem('cdata'))
    )
    const [dirData,setDirData] = useState();
    const [loading,setLoading] = useState(false);
    const [modalShow,setModalShow] = useState(false);
    const [birthDate,setBirthDate] = useState();
    const [error,setError] = useState(false);
    const [majorityShareHolder,setMajorityShareHolder] = useState();

    const [shareHolderName,setShareHolderName] = useState(
        localStorage.getItem('shareholders') && JSON.parse(localStorage.getItem('shareholders'))
    );


useEffect(()=>{

    const findMajorityShareHolder = shareHolderName?.shareHolders?.reduce((prev, current) => {
        return (prev.totalNumberOfSharesOwned > current.totalNumberOfSharesOwned) ? prev : current;
      });

      findMajorityShareHolder && setMajorityShareHolder(findMajorityShareHolder);

      console.log(findMajorityShareHolder)

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
        console.log(data.directors);
        if(data.directors.length == 0) {
            setError(true);
        }else{
            data.directors.map(data=>{
                console.log(data);
                setDirData(data);
                const dateValue = data.dateOfBirth;
                const dateStringValue = dateValue.toString();
                convertDate(dateStringValue);
            })
        }
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
                            <li><span>Company name</span><span><span>:</span>{companydata.report.companySummary.businessName}</span></li>
                            <li><span>Company number</span><span><span>:</span>{companydata.report.companySummary.companyNumber}</span></li>
                            <li><span>Registration number</span><span><span>:</span>{companydata.report.companySummary.companyRegistrationNumber}</span></li>
                            <li><span>Company status</span><span><span>:</span>{companydata.report.companySummary.companyStatus.status}</span></li>
                            <li><span>Country</span><span><span>:</span>{companydata.report.companySummary.country}</span></li>
                            {majorityShareHolder &&
                                <li><span>Majority share holder (PSC)</span><span><span>:</span>{majorityShareHolder?.name}</span></li>
                            }
                        </ul>
                    </div>
                    <div className="director-list-outer">
                        {companydata?.report?.directors?.currentDirectors && <h3>Company directors</h3>}
                        <ul>
                            {
                                companydata?.report?.directors?.currentDirectors && (companydata.report.directors.currentDirectors).map((item,index)=>{
                                    return(
                                        <li key={item.id}><span><span>{index + 1}</span>{item.name}</span><button onClick={onClickHandler} id={item.id}>View details</button></li>
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
                                        <li key={item.id}><span><span>{index + 1}</span>{item.name}</span><button onClick={onClickHandler} id={item.id}>View details</button></li>
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
                        <div className="modal-scroller">
                        <h4>Director details</h4>
                        <ul>
                        
                        {dirData?.firstName && <li>
                            <div>First name</div><div><span>:</span>{dirData.firstName}</div>
                        </li>}

                        {dirData?.lastName && <li>
                            <div>Last name</div><div><span>:</span>{dirData.lastName}</div>
                        </li>}

                        {dirData?.dateOfBirth && <li>
                            <div>Date of birth</div><div><span>:</span>{birthDate}</div>
                        </li>}

                        {dirData?.localDirectorNumber && <li>
                            <div>Local director no</div><div><span>:</span>{dirData.localDirectorNumber}</div>
                        </li>}
                            
                    </ul>

                     {
                        dirData?.address.simpleValue == "" ? "":
                        <div>
                            <h5>Address</h5>
                            <ul>
                            
                                {dirData?.address?.houseNo && <li>
                                    <div>House no</div><div><span>:</span>{dirData.address.houseNo}</div>
                                </li>}

                                {dirData?.address?.street && <li>
                                    <div>Street</div><div><span>:</span>{dirData.address.street}</div>
                                </li>}

                                {dirData?.address?.province && <li>
                                    <div>Province</div><div><span>:</span>{dirData.address.province}</div>
                                </li>}

                                {dirData?.address?.city && <li>
                                    <div>City</div><div><span>:</span>{dirData.address.city}</div>
                                </li>}

                                {dirData?.address?.postCode && <li>
                                    <div>Postcode</div><div><span>:</span>{dirData.address.postCode}</div>
                                </li>}
                                
                            </ul>
                        </div>
                     }

                    </div> :
                    <p className="modal-error">There is no data regarding this person</p>
                    }
                </div>
            </div>
            }
        </div>
    );
}

export default ListingTwo;

