import {useState,useEffect,useRef} from "react";
import "./Search.css";
import { useNavigate } from 'react-router-dom';
import LoaderImg from '../../assets/loading-gif.gif';

const Search = () => {

   
    const [country,setCountry] = useState("");
    const [company,setCompany] = useState("");
    const [hind,setHind] = useState("");
    const [companyId,setCompanyId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [disabled,setDisabled] = useState(true);
    const [error,setError] = useState(false);
    const [loader, setLoader] = useState(false);

    const inputRef = useRef(null);

    const selectChangeHanler = (e) => {
        setCountry(e.target.value);
        setDisabled(false);
    }

    const companyNameHandler = (e) => {
        setCompany(e.target.value);
        setError(false)
        document.querySelector(".companyListing").style.opacity = "1";
        document.querySelector(".companyListing").style.pointerEvents = "all";
 
    }

    const onCompanyClickHandler = (e) => {
        setCompany(e.target.innerHTML);
        setCompanyId(e.target.id);
        document.querySelector(".companyListing").style.opacity = "0";
        document.querySelector(".companyListing").style.pointerEvents = "none";
        inputRef.current.focus();
    }



// function for fetching company details using company id


function fetchCompanyDetails(companyId) {

  const url = `http://ec2-35-153-33-250.compute-1.amazonaws.com:8080/TegPoc/companies1?company_id=${companyId}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      localStorage.setItem('country',country);
      localStorage.setItem('cdata', JSON.stringify(data));
      data?.report?.shareCapitalStructure && localStorage.setItem('shareholders', JSON.stringify(data.report.shareCapitalStructure));
      !data.report && setError(true);
      data.report && navigate('/listing2');
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(function() {
      setIsLoading(false);
    });
}

// function for fetching company name hind while typing company name

function fetchCompanies(country, company) {
  const trimmedCompany = company.split(" ").join("");
  const url = `http://ec2-35-153-33-250.compute-1.amazonaws.com:8080/TegPoc/search1?countries=${country}&name=${trimmedCompany}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const companyData = data.companies;
      setHind(companyData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(function () {
      setLoader(false);
    });
}

    useEffect(() => {

      if (company.length >= 3) {
        setLoader(true);
        fetchCompanies(country, company);
      }

    }, [company, setCompany]);
    
const navigate = useNavigate();

// form submit function

    const onSubmitHandler = (e) => {
      localStorage.removeItem('cdata');
      localStorage.removeItem('shareholders');
      e.preventDefault();
      setIsLoading(true);
      fetchCompanyDetails(companyId);

    };
    
    



    return(
        <div className="search">
            <div className="container">
                <div className="form-inner">
                    <form onSubmit={onSubmitHandler}>
                        <h3>Search your company</h3>
                        <div className="input-wrap">
                            <select onChange={selectChangeHanler}>
                                <option value = "">Select Country</option>
                                <option value = "US">United States</option>
                                <option value = "CA">Canada</option>
                                <option value = "GB">United Kingdom</option>
                            </select>
                        </div>
                        <div className="input-wrap">
                            { loader == true ? <img src={LoaderImg} className="loaderImage"/> : ""}
                            {
                                disabled == true ?
                                <input disabled value={company} onChange={companyNameHandler} placeholder="Enter company name"/>:
                                <input ref={inputRef} value={company} onChange={companyNameHandler} placeholder="Enter company name"/>
                            }
                            <ul className="companyListing">
                            {
                                hind && hind.map(hind=>{
                                    return(
                                        <li id={hind.id} onClick={onCompanyClickHandler} key={hind.id}>{hind.name}</li>
                                    )
                                })
                            }
                        </ul>
                        </div>
                        <button>Search</button>
                        {error == true && <p className="error">This company has no data</p>}
                    </form>
                </div>
            </div>
            {isLoading && <div className="Loader">Loading data...</div>}
        </div>
    );
}

export default Search;