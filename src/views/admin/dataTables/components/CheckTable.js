import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Input,
  Switch,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  FormControl
  , FormLabel
  , FormErrorMessage
  , Button
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
export default function CheckTable(props) {
  const { columnsData, tableData, titleData } = props;
  const tableDataFields = tableData.fields;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableDataFields, [tableDataFields]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Formik
      initialValues={data.reduce((values, row, index) => ({
        ...values,
        [`description_${index}`]: '' // Assuming row.description is the initial value
        , [`isSensitive_${index}`]: false
      }), {})
      }
      onSubmit={(values, actions) => {
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2))
          const transformedValues = tableDataFields.map((field, index) => {
            const descriptionValueKey = `description_${index}`;
            const isSensitiveValueKey = `isSensitive_${index}`;
            let description = values[descriptionValueKey];
            let isSensitive = values[isSensitiveValueKey];

            return {
              ...field,
              description,
              isSensitive
            };
          });
          const tempResult = transformedValues.map(item => ({
            ...item, // Spread the rest of the properties
            datatype: item.type.name, // Add new datatype property
            type: undefined // Set type as undefined to remove it from the object
          })).map(item => {
            const { type, ...rest } = item; // Destructure to exclude the type property
            return rest;
          })
          const finalResult = tempResult.map(
            item => ({ 
              ...item 
              , dataset_path: titleData
              , status:"Pending"
              , create_datetime: new Date().toISOString()
              , create_user: "frontend"
              , last_modified_datetime: new Date().toISOString()
              , last_modified_user: "frontend"
            })
          );
          console.log(JSON.stringify(finalResult, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
              <Text
                color={textColor}
                fontSize='22px'
                fontWeight='700'
                lineHeight='100%'>
                {titleData}
              </Text>
              {/* <Menu /> */}
            </Flex>

            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
              <Thead>
                {headerGroups.map((headerGroup, index) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <Th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        pe='10px'
                        key={index}
                        borderColor={borderColor}>
                        <Flex
                          justify='space-between'
                          align='center'
                          fontSize={{ sm: "10px", lg: "12px" }}
                          color='gray.400'>
                          {column.render("Header")}
                        </Flex>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {page.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()} key={rowIndex}>
                      {row.cells.map((cell, cellIndex) => {
                        let data = "";
                        if (cell.column.Header === "COLUMN NAME") {
                          data = (
                            <Flex align='center'>
                              {/* <Checkbox
                          defaultChecked={cell.value[1]}
                          colorScheme='brandScheme'
                          me='10px'
                        /> */}
                              <Text color={textColor} fontSize='sm' fontWeight='700'>
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "DATA TYPE") {
                          data = (
                            <Flex align='center'>
                              <Text
                                me='10px'
                                color={textColor}
                                fontSize='sm'
                                fontWeight='700'>
                                {cell.value.name}
                              </Text>
                            </Flex>
                          );
                        } else if (cell.column.Header === "DESCRIPTION") {
                          const fieldName = `description_${rowIndex}`;
                          data = (
                            <Field name={fieldName}>
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                  {/* <FormLabel htmlFor="name">First name</FormLabel> */}
                                  <Input
                                    {...field}
                                    // id="description"
                                    placeholder="Description"
                                    color={textColor}
                                    fontSize='sm'
                                    fontWeight='700'
                                    borderRadius='16px'
                                  />
                                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          );
                        } else if (cell.column.Header === "IS SENSITIVE") {
                          const fieldName = `isSensitive_${rowIndex}`;
                          data = (
                            <Field name={fieldName}>
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                  <Switch {...field} colorScheme="brand" />
                                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          );
                        }
                        return (
                          <Td
                            {...cell.getCellProps()}
                            key={cellIndex}
                            fontSize={{ sm: "14px" }}
                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                            borderColor='transparent'>
                            {data}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            SQL logic: {tableData.sql}
            <Button
              mt={4}
              colorScheme="brand"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
