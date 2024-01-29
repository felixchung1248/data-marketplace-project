import {
    Box,
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
  import React, { useMemo, useState } from "react";
  import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  import './App.css';
  import { Notifications } from 'react-push-notification';
  import NotificationComponent from './module/NotificationComponent'
  import SimpleForm from './module/form/SimpleForm';

export default function Chat(props) {
    return (
        <Box>
          <div className="App">
            <SimpleForm />
          </div>
        </Box>
    );
}