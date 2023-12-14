/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import CheckTable from "views/admin/dataTables/components/CheckTable";

import React from "react";

export default function Settings() {

  const tableDataCheck = [
    {
      "name":["Marketplace",false],
      "quantity": 2458, 
      "date": "12.Jan.2021",
      "progress": 75.5  
    },
    {
      "name":["Venus DB PRO",true],
      "quantity": 1485, 
      "date": "21.Feb.2021",
      "progress": 35.4  
    },
    {
      "name":["Venus DS",true],
      "quantity": 1024, 
      "date": "13.Mar.2021",
      "progress": 25  
    },
    {
      "name":["Venus 3D Asset",true],
      "quantity": 858, 
      "date": "24.Jan.2021",
      "progress": 100  
    },
    {
      "name":["Marketplace",false],
      "quantity": 258, 
      "date": "Oct 24, 2022",
      "progress": 75.5  
    },
    {
      "name":["Marketplace",false],
      "quantity": 258, 
      "date": "Oct 24, 2022",
      "progress": 75.5  
    },
    {
      "name":["Marketplace",false],
      "quantity": 258, 
      "date": "12.Jan.2021",
      "progress": 75.5  
    },
    {
      "name":["Venus DB PRO",false],
      "quantity": 858, 
      "date": "21.Feb.2021",
      "progress": 35.4  
    },
    {
      "name":["Venus DS",false],
      "quantity": 1024, 
      "date": "13.Mar.2021",
      "progress": 25  
    },
    {
      "name":["Venus 3D Asset",false],
      "quantity": 258, 
      "date": "24.Jan.2021",
      "progress": 100  
    },
    {
      "name":["Marketplace",false],
      "quantity": 1024, 
      "date": "Oct 24, 2022",
      "progress": 75.5  
    },
    {
      "name":["Marketplace",false],
      "quantity": 258, 
      "date": "Oct 24, 2022",
      "progress": 75.5  
    },
    {
      "name":["Marketplace",false],
      "quantity": 258, 
      "date": "Oct 24, 2022",
      "progress": 75.5  
    }
  ]
  
  const columnsDataCheck = [
    {
      Header: "COLUMN NAME",
      accessor: "name",
    },
    {
      Header: "DATA TYPE",
      accessor: "progress",
    },
    {
      Header: "DESCRIPTION",
      accessor: "quantity",
    },
    {
      Header: "IS SENSITIVE",
      accessor: "date",
    },
  ];


  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {/* <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        /> */}
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        {/* <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
      </SimpleGrid>
    </Box>
  );
}
