import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useEditTermMutation } from "../../redux/services/term&condition.service";
import { Formik } from "formik";
import CustomInputField from "../common/CustomInputField";
// import CustomInputField from "../../pages/staff/CustomInputField";
import {
  useAssignRoleToUserMutation,
  useGetCreatedPermissionsQuery,
  useUpdateAssignedUserRoleMutation,
} from "../../redux/services/roleManagement/roleManagement.service";
import { roleValidationSchema } from "../../validations/rolemanagement/createRole";
import { useSelector } from "react-redux";
import { ExceptionHanlder } from "../../utils/exceptionHandler/ExceptionHandler";
import { useStaffListQuery } from "../../redux/services/staffManagment.service";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const RoleAssign = ({ open, setOpen, editUserData, setEditUserData }) => {
  const [assignRole, { isLoading }] = useAssignRoleToUserMutation();
  const { data, isFetching } = useGetCreatedPermissionsQuery();
  const [updateAssignedUserRole] = useUpdateAssignedUserRoleMutation();
  const { data: staffList = [] } = useStaffListQuery();
  console.log("staffList", staffList);
  const assignRoles = useSelector(
    (state) => state.assignRoleReducerSlice.assignRoleList
  );
  // console.log("__________", editUserData);
  const [inputFields, setInputFields] = useState([
    {
      name: "username",
      label: "Username",
      options: [],
      placeholder: "Name",
      select: true,
      disabled: true,
    },

    {
      name: "role",
      label: "Role",
      placeholder: "Role",
      options: [],
      select: true,
    },
  ]);
  useEffect(() => {
    // console.log("assign render usedd", assignRoles);
    setInputFields([
      // {
      //   name: "username",
      //   label: "Name",
      //   placeholder: "Name",
      // },
      // {
      //   name: "email",
      //   label: "Email",
      //   placeholder: "example@example.com",
      // },
      {
        name: "username",
        label: "Username",
        placeholder: "Name",
        options: staffList?.length > 0 && staffList,
        select: true,
        disabled: true,
      },
      {
        name: "role",
        label: "Role",
        placeholder: "Role",
        options: (assignRoles?.length > 0 && assignRoles) || data?.data,
        select: true,
      },
    ]);
  }, [isFetching, assignRoles, data?.data, JSON.stringify(staffList)]);
  const handleClose = () => {
    setOpen(false);
    setEditUserData(null);
  };

  const onSubmit = async (values) => {
    // console.log("clicked", values);
    if (editUserData) {
      const res = await updateAssignedUserRole([
        editUserData.id,
        {
          username: values.username,
          role: values?.role,
        },
      ]);
      // console.log("res api", res);
      ExceptionHanlder(res);
    } else {
      // console.log("values ddd", values, assignRoles);
      const roleId = (
        (assignRoles.length > 1 && assignRoles) ||
        data?.data
      ).find((item, i) => item.id == values.role).id;
      // console.log("roleId", roleId);
      const finalData = {
        ...values,
        role: roleId,
      };
      const res = await assignRole(finalData);
      // console.log("res bb", res);
      ExceptionHanlder(res);
    }
    // toast.success(
    //   `User ${editUserData ? "updated" : "assigned to role"} successfuly`
    // );

    handleClose();
  };
  // console.log("editUserData", editUserData?.username);
  // useEffect(() => {
  //   setTerm(editTextData?.terms_and_condition);
  // }, [editTextData, open]);
  console.log("editUserData", editUserData);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: "571px" }}>
        <Typography
          align="center"
          sx={{
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          {editUserData ? "Update Role of User" : " Assign Role to User"}
        </Typography>
        <Formik
          initialValues={{
            username: editUserData?.username,
            role: editUserData?.role,
          }}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={roleValidationSchema}
        >
          {({ errors, handleSubmit, values, handleChange }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Stack rowGap>
                  {/* {console.log("inputFields", inputFields)} */}

                  {inputFields?.map(
                    (
                      { name, label, placeholder, disabled, options, select },
                      index
                    ) => (
                      <CustomInputField
                        key={index}
                        fullWidth
                        name={name}
                        label={label}
                        placeholder={placeholder}
                        options={options}
                        disabled={editUserData && disabled}
                        select={select}
                        defaultValue={values?.username}
                        InputField="role_assign"
                      />
                    )
                  )}

                  <LoadingButton
                    variant="contained"
                    sx={{
                      backgroundColor: "#594DA0",
                      width: "100%",
                      height: "60px",
                      borderRadius: "16px",
                      marginTop: "20px",
                      "&:hover": {
                        backgroundColor: "#594DA0",
                      },
                    }}
                    type="submit"
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>
                </Stack>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default RoleAssign;
