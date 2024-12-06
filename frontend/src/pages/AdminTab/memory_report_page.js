import React, { useEffect, useState } from 'react'
import '../../styles/reportPage.css'
import searchIcon from '../../assets/search6.png'
import upBtn from '../../assets/upArrow.png'
import downBtn from '../../assets/downArrow.png'
import downloadBtn from '../../assets/DownloadBtn.png'
import backBtn from '../../assets/BackBtn.png'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function MemoryReportPage() {

  const [allImages, setAllImages] = useState([])
  const [displayImages, setDisplayImages] = useState([])
  const [searchLocation, setSearchLocation] = useState('')


  useEffect(() => {

    getImage()

  }, [])

  const navigate = useNavigate();

  const handleClickGoBack = () => {
    navigate('/admin');
  };


  const downloadReport = () => {
    // Calculate average view count per image
    const avgViewCount = calculateAverageViewCountPerImage();

    // Find image with highest view count
    const { highestViewCountImage } = findHighestLowestViewCounts();

    // Find image with lowest view count
    const { lowestViewCountImage } = findHighestLowestViewCounts();

    // Prepare data for all images in ascending order of view count
    const allImagesData = displayImages.map(image => ({
      'Memory ID': image._id,
      'View Count': image.viewCount,
      Photos: image.image.length,
      Date: image.date,
      Location: image.location
    }));

    // Sort allImagesData by 'View Count' in ascending order
    allImagesData.sort((a, b) => a['View Count'] - b['View Count']);

    // Prepare columns for the table
    const columns = [
      { title: 'Memory ID', dataKey: 'Memory ID' },
      { title: 'View Count', dataKey: 'View Count' },
      { title: 'Photos', dataKey: 'Photos' },
      { title: 'Date', dataKey: 'Date' },
      { title: 'Location', dataKey: 'Location' }
    ];

    // Create a new PDF document
    const doc = new jsPDF();

    // Add content to the PDF document
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Report on view count of the memories', 10, 10);
    doc.setFontSize(11);
    doc.text(`Average View Count per Memory: ${avgViewCount}`, 10, 20);
    doc.text('Memory with Highest View Count:', 10, 30);
    doc.setFont('helvetica', 'normal');
    doc.text(`Memory ID: ${highestViewCountImage._id}`, 20, 40);
    doc.text(`View Count: ${highestViewCountImage.viewCount}`, 20, 50);
    doc.text(`Photos: ${highestViewCountImage.image.length}`, 20, 60);
    doc.text(`Date: ${highestViewCountImage.date}`, 20, 70);
    doc.text(`Location: ${highestViewCountImage.location}`, 20, 80);
    doc.setFont('helvetica', 'bold');
    doc.text('Memory with Lowest View Count:', 10, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(`Memory ID: ${lowestViewCountImage._id}`, 20, 100);
    doc.text(`View Count: ${lowestViewCountImage.viewCount}`, 20, 110);
    doc.text(`Photos: ${lowestViewCountImage.image.length}`, 20, 120);
    doc.text(`Date: ${lowestViewCountImage.date}`, 20, 130);
    doc.text(`Location: ${lowestViewCountImage.location}`, 20, 140);

    doc.setFont('helvetica', 'bold');
    doc.text('List of All Memories (Ascending Order by View Count):', 10, 150);
    doc.setFont('helvetica', 'normal');
    doc.autoTable(columns, allImagesData, { startY: 160 });

    // Save the PDF document
    doc.save('report.pdf');
  };


  const calculateAverageViewCountPerImage = () => {
    if (allImages.length === 0) {
      return 0; // Return 0 if there are no images
    }

    const totalViewCount = allImages.reduce((acc, image) => acc + image.viewCount, 0);
    const avgViewCount = totalViewCount / allImages.length;

    return avgViewCount.toFixed(2); // Limit to 2 decimal places

  };


  const findHighestLowestViewCounts = () => {
    if (displayImages.length === 0) {
      return { highestViewCountImage: null, lowestViewCountImage: null };
    }

    let highestViewCountImage = displayImages[0];
    let lowestViewCountImage = displayImages[0];

    for (let i = 1; i < displayImages.length; i++) {
      const image = displayImages[i];
      if (image.viewCount > highestViewCountImage.viewCount) {
        highestViewCountImage = image;
      }
      if (image.viewCount < lowestViewCountImage.viewCount) {
        lowestViewCountImage = image;
      }
    }

    return { highestViewCountImage, lowestViewCountImage };
  };

  const { highestViewCountImage, lowestViewCountImage } = findHighestLowestViewCounts();




  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  const getImage = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/image/')
      setAllImages(result.data.data)
      setDisplayImages(result.data.data)

      console.log(allImages)
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const sortImagesAscending = () => {
    const sortedImages = [...displayImages].sort((a, b) => a.viewCount - b.viewCount);
    setDisplayImages(sortedImages);
  };

  const sortImagesDescending = () => {
    const sortedImages = [...displayImages].sort((a, b) => b.viewCount - a.viewCount);
    setDisplayImages(sortedImages);
  };




  const handleSearch = () => {
    if (searchLocation && searchLocation.trim() !== "") {
      const filteredImages = allImages.filter((image) =>
        image.location.toLowerCase().includes(searchLocation.toLowerCase()) || image.location.toLowerCase().indexOf(searchLocation.toLowerCase()) !== -1
      )
      setDisplayImages(filteredImages)
    } else {
      setDisplayImages(allImages)
    }
  }



  const handleSearchInputChange = (e) => {
    setSearchLocation(e.target.value)
  }


  return (

    <div className=''>
      <div className='adminTab'>
        <div>
          <div className='topsection w-100'>
          <h1
      className='adminTabTitle'
      id='tabTitle'
      onClick={() => window.location.reload()}
      style={{ 
        textAlign: 'center' ,color: 'white' ,  fontFamily: 'Anton' }}
    > <br></br>
      Photography & Memory Sharing
      <br></br>
    </h1>
    <h1 style={{ 
       textAlign: 'center' ,color: 'white' ,  fontFamily: 'Anton' }}>Report Generation</h1>
       <br></br>
            <div className='memoryAdder'>
              <div className='btnSection4'>
                <button className='btn btn-primary' onClick={handleClickGoBack}>
                  <img src={backBtn} alt='back' title='Go back to Admin Tab' style={{ paddingRight: '1px' }} />
                </button>
                <button className='btn btn-primary' onClick={sortImagesDescending}>
                  <img src={upBtn} alt='up' title='Descending Order' style={{ paddingRight: '1px' }} />
                </button>
                <button className='btn btn-primary' onClick={sortImagesAscending}>
                  <img src={downBtn} alt='down' title='Ascending Order' style={{ paddingRight: '5px' }} />
                </button>
              </div>
              <div className='search-bar'>
                <input type='text' placeholder='Search Memory...' value={searchLocation} onChange={handleSearchInputChange} onKeyDown={handleKeyDown} className='form-control' />
              </div>
              <div className='btnSection4'>
                <button className='btn btn-primary' onClick={handleSearch}>
                  <img src={searchIcon} alt='search button' title='Search' style={{ paddingRight: '10px' }} />
                </button>
                <button className='btn btn-primary' onClick={downloadReport}>
                  <img src={downloadBtn} alt='search button' title='Download Report' />
                </button>
              </div>
            </div>
          </div>

          

          <div className="w-100 my-4" style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div className='text-light'>
        <div className="card text-light" style={{ width: '18rem', backgroundColor:'#26619c' }}>
            <div className="card-body text-light">
                <h4 className="card-title text-light">Average View Count</h4>
                <h4 className='text-light'>Per Memory</h4>
                <p  className="card-text text-center text-light" style={{ fontSize: '50px' }}>{calculateAverageViewCountPerImage()}</p>
            </div>
        </div>
    </div>
    {highestViewCountImage && (
        <div className='text-light'>
            <div className="card text-light" style={{ width: '18rem', backgroundColor:'#26619c' }}>
                <div className="card-body text-light">
                    <h4 className="card-title text-light">Highest View Count</h4>
                    <p className='text-light'><b>Memory ID: </b>{highestViewCountImage._id}</p>
                    <p className='text-light'><b>View Count: </b>{highestViewCountImage.viewCount}</p>
                    <p className='text-light'><b>Photos: </b>{highestViewCountImage.image.length}</p>
                    <p className='text-light'><b>Date: </b>{highestViewCountImage.date}</p>
                    <p className='text-light'><b>Location: </b>{highestViewCountImage.location}</p>
                </div>
            </div>
        </div>
    )}
    {lowestViewCountImage && (
        <div className='text-light '>
            <div className="card text-light " style={{ width: '18rem', backgroundColor:'#26619c' }}>
                <div className="card-body text-light">
                    <h4 className='text-light'>Lowest View Count</h4>
                    <p className='text-light'><b>Memory ID: </b>{lowestViewCountImage._id}</p>
                    <p className='text-light'><b>View Count: </b>{lowestViewCountImage.viewCount}</p>
                    <p className='text-light'><b>Photos: </b>{lowestViewCountImage.image.length}</p>
                    <p className='text-light'><b>Date: </b>{lowestViewCountImage.date}</p>
                    <p className='text-light'><b>Location: </b>{lowestViewCountImage.location}</p>
                </div>
            </div>
        </div>
    )}
</div>

        </div>
        <div className='imageGrid' style={{ display: 'flex', justifyContent: 'center' }}>
          {displayImages == null ? '' : displayImages.map((data, index) => (
            <div key={index} className='memoryCard' style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="card" id='card'>
                <div className="card-body" id='card-body'>
                  <p><b>Memory ID: </b>{data._id}</p>
                  <p><b>View Count: </b>{data.viewCount}</p>
                  <p><b>Photos: </b>{data.image.length}</p>
                  <p><b>Date: </b>{data.date}</p>
                  <p><b>Location: </b>{data.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
