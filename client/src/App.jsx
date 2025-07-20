import {Route, Routes} from 'react-router-dom';
import {Box,Button} from '@chakra-ui/react';

function App(){
  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lost" element ={<LostItem />} />
      </Routes>
    </Box>
  );
}

export default App;