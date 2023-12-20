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
import { 
  Box
  , SimpleGrid
  , Grid
  , GridItem
  , Progress
} from "@chakra-ui/react";

import CheckTable from "views/admin/dataTables/components/CheckTable";

import React, { useState, useEffect } from "react";
import Select from 'react-select';


export default function Settings() {

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [titleData, setTitleData] = useState(false);

  useEffect(() => {
    fetch('https://dremiofunc.azurewebsites.net/api/ListAllDatasets?code=BjojRSGOwGo7-g66PBI1O0iQkvTqHqADqRNRq3XF_aLbAzFuZvxgrA==')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((json) => {
        setData(json); // If you want to update state with this json, uncomment this line
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false);
      });
  }, []);

  const columnsDataCheck = [
    {
      Header: "COLUMN NAME",
      accessor: "name",
    },
    {
      Header: "DATA TYPE",
      accessor: "type",
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


  const handleSelectChange = (selectedOption) => {
    if (selectedOption === null){
      return;
    }

    const url = `https://dremiofunc.azurewebsites.net/api/ShowDatasetDesc?code=Ln4D4Fh4HAFzg7-mtPa-LhL8UnXAoMWDQGxTyDb2cpi1AzFuqeGTtQ==&name=${selectedOption.value}`
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((tableCatalog) => {
        setTableData(tableCatalog); // If you want to update state with this json, uncomment this line
        setTitleData(selectedOption.value);
        setShowTable(true);
      })
      .catch((error) => {
        console.error(error)
      });
  };

  function validateName(value) {
    let error
    if (!value) {
      error = "Name is required"
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

{/* <Formik
      initialValues={{ name: "Sasuke" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="name"
                  borderRadius="16px"
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="brand"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik> */}

      <Grid
        mb='20px'
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={{ sm: 1, md: 4 }}
      // spacing={{ base: "20px", xl: "20px" }}
      >
        <GridItem colSpan={1}>
          {isLoading && ( <Progress size="md" isIndeterminate />)}
          {!isLoading && data && (
            <Select
              className="basic-single"
              classNamePrefix="select"
              // value={selectedOption}
              onChange={handleSelectChange}
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="color"
              options={data.map(item => ({ value: item, label: item }))}
            />
          )}
        </GridItem>
          {showTable && 
            (<GridItem rowSpan={2}>
              <CheckTable columnsData={columnsDataCheck} tableData={tableData} titleData={titleData}/>
            </GridItem>
            )
          }
        </Grid>
    </Box>
  );
}
