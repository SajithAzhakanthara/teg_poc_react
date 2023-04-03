import "./Listing.css";
import { useState,useEffect } from "react";


const Listing = () => {

    const [data,setData] = useState(
        localStorage.getItem('cdata') && JSON.parse(localStorage.getItem('cdata'))
    )



    return(
       <div className="listing">
        <div className="listing-outer">
           <div className="container">
              <div className="listing-inner">
                <div className="company-detail-box">
                    <h3>Company details</h3>
                    <ul className="company-detail-list">
                        <li><span>Company name</span><span>: {data.report.companySummary.businessName}</span></li>
                        <li><span>Company number</span><span>: {data.report.companySummary.companyNumber}</span></li>
                        <li><span>Registration number</span><span>: {data.report.companySummary.companyRegistrationNumber}</span></li>
                        <li><span>Company status</span><span>: {data.report.companySummary.companyStatus.status}</span></li>
                        <li><span>Country</span><span>: {data.report.companySummary.country}</span></li>
                    </ul>
                {data.report.directors && <h5>Company directors</h5>}
                    <ul className="director-list">
                        {
                             data.report.directors && (data.report.directors.currentDirectors).map((item,index)=>{
                                return(
                                    <li key={item.id}><span>{index + 1}</span><span>{item.name}</span><button>View details</button></li>
                                )
                            })
                        }
                    </ul>
                </div>
              </div>
           </div>
        </div>
       </div>
    );
}

export default Listing;