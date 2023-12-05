import React, { useState,useEffect } from 'react';
import SearchBar from './SearchBar';
import { Container, Grid, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, Pagination, Paper } from '@mui/material';
import {getAll } from './getDataHistory.js'

const History = () => {
    const [openModal, setOpenModal] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [historyArr, setHistoryArr] = useState([]);
    const entriesPerPage = 5; 
  
    // Dummy data for the board
    // const historyArr = [
    //   { id: 0, time: '2023-11-26', description: 'Lorem ipsum dolor sit amet' },
    //   { id: 1, time: '2023-11-26', description: 'Lorem ipsum dolor sit amet' },
    //   { id: 2, time: '2023-11-26', description: 'Lorem ipsum dolor sit amet' },
    //   { id: 3, time: '2023-11-26', description: 'Lorem ipsum dolor sit amet' },
    //   { id: 4, time: '2023-11-26', description: 'Lorem ipsum dolor sit amet' },
    //   { id: 5, time: '2023-11-26', description: 'Lorem ipsum dolor sit amet' },
    // ];
    useEffect(() => {
      const fetchData = async () => {
        const data = await getAll();
        setHistoryArr(data);
      }
      fetchData();
      console.log(historyArr);
    }, []);
  
    // Dummy modal content
    const modalContent = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" fontSize={20} mb={2}>
            Modal Content
          </Typography>
          <div style={{ marginBottom: '8px', flexGrow: 1 }}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec elit ac elit fermentum cursus. Duis vel urna eu lacus lacinia sagittis. Proin eget sapien quis eros iaculis vulputate.
            </Typography>
          </div>
          <Button variant="contained" onClick={() => setOpenModal(false)} style={{ alignSelf: 'flex-end' }}>
            Close
          </Button>
        </div>
      );
    //Pagination
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = historyArr.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const handleSearch = (searchTerm, selectedFilter) => {
        const filteredHistory = historyArr.filter((entry) => {
          return (
            entry.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
            entry.description.toLowerCase().includes(selectedFilter.toLowerCase())
          );
        });

        console.log('Filtered Results:', filteredHistory);
      };
  
    return (
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="space-between" marginBottom={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontSize={30}>
              History
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
        <SearchBar onSearch={handleSearch} />
      </Grid>
        </Grid>
  
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyArr.map((each) => (
                <TableRow key={each.id}>
                  <TableCell>{each.time}</TableCell>
                  <TableCell>{each.description}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => setOpenModal(true)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(historyArr.length / entriesPerPage)}
          page={currentPage}
          onChange={(event, page) => paginate(page)}/>
        </div>
  
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
            {modalContent}
          </div>
        </Modal>
      </Container>
    );
  };
  
  export default History;