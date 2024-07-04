import React, { useState } from "react";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CategoryCard from "./CategoryCard";
import Modal from "@mui/material/Modal";
import { Formik } from "formik";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { categorySchema } from "../../validations/category/category";
import CustomFileUpload from "../../components/common/customFileUpload/CustomeFileUpload";
// import { useCreateCategoryMutation } from "../../redux/services/category.service";
import { toast } from "react-hot-toast";
import {
  useCategoryNamesQuery,
  useCreateCategoryMutation,
} from "../../redux/services/category.service";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";
import usePermission from "../../utils/permissionHandler/PermissionHandler";
import { useEffect } from "react";
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

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px ",
    "& fieldset": {
      border: "3px solid #9277F7",
      borderColor: "#9277F7",
    },
    "&:hover fieldset": {
      borderColor: "#9277F7",
      border: "3px solid #9277F7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9277F7",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        // color: "#000000",
        color: "#9277F780",
        fontWeight: "500",
        fontsize: "14px",
        lineHeight: "22.4px",
      },
    },
  },
});
const initialValues = {
  name: "",
};
const Category = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [image, setImage] = useState("");
  const [createCategory] = useCreateCategoryMutation();
  const { data: { data: categoryNames = [] } = {} } = useCategoryNamesQuery();

  const canViewOccupation = usePermission("view_occupation");
  const canCreateOccupation = usePermission("add_occupation");

  // console.log({ canViewOccupation }, { canCreateOccupation });
  // console.log("data", categoryNames);
  // function createCategory() {}

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setOpenEditModal(false);
  };

  const onSubmit = async (values) => {
    if (image) {
      if (image.size > 2097152) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("image", image);

      try {
        // Set loading state to true while the API call is in progress
        setLoading(true);

        const res = await createCategory(formdata);

        // Set loading state back to false after the API call is completed
        setLoading(false);

        setOpen(false);
        if (res?.data?.message) {
          toast.success(res?.data?.message);
        }

        if (res?.error) {
          toast.error(res?.error?.data?.message || "Something went wrong");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        setLoading(false); // Ensure loading state is reset even if an error occurs
      }
    } else {
      toast.error("Image is required");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          // padding: "20px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          Categories
        </Typography>
        {canCreateOccupation && (
          <Button
            startIcon={<AddBoxIcon />}
            variant="contained"
            onClick={handleOpen}
            sx={{
              borderRadius: "8px",
              textTransform: "capitalize",
              marginRight: "30px",
            }}
          >
            Add Category
          </Button>
        )}
      </Box>
      <CategoryCard />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "571px", borderRadius: "16px" }}>
          <IconButton
            onClick={handleClose}
            aria-label="settings"
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#000000",
            }}
          >
            <CancelIcon />
          </IconButton>
          <Typography
            align="center"
            sx={{
              fontWeight: "700",
              fontSize: "40px",
              lineHeight: "64px",
              color: "#594DA0",
            }}
          >
            Add Category
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={categorySchema}
          >
            {({ errors, handleSubmit, values, handleChange, touched }) => {
              return (
                <>
                  <form
                    onSubmit={handleSubmit}
                    style={
                      {
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // flexDirection: "column",
                      }
                    }
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "24px",
                      }}
                    >
                      Select Category Name:
                    </Typography>
                    <Select
                      input={<CssTextField />}
                      placeholder="Bathroom Fitting"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      select
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                      sx={{
                        // width: { xs: "100%", sm: "491px" },
                        width: "100%",
                        height: "60px",
                        marginTop: "18px",
                      }}
                      // renderValue={(selected) => {
                      //   if (selected.length === 0) {
                      //     return (
                      //       <em style={{ color: "red", textAlign: "start" }}>
                      //         Select a Name
                      //       </em>
                      //     );
                      //   }

                      //   return selected.join(", ");
                      // }}
                    >
                      {categoryNames.map((option) => (
                        <MenuItem key={option[0]} value={option[0]}>
                          {option[1]}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.name && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {errors.name}
                      </Typography>
                    )}
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "24px",
                        marginTop: "24px",
                      }}
                    >
                      Upload Image or Icon:
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "18px",
                        letterSpacing: "2%",
                        marginTop: "9px",
                        marginBottom: "6px",
                      }}
                    >
                      File types supported: JPG, PNG, SVG, Max size: 2 MB
                    </Typography>

                    <CustomFileUpload
                      maxUploadSizeMB={2}
                      property={true}
                      borderRadius="24px"
                      width="100%"
                      setImage={setImage}
                    />
                    <LoadingButton
                      variant="contained"
                      sx={{
                        backgroundColor: "#9277F7",
                        // width: { xs: "100%", sm: "491px" },
                        width: "100%",
                        height: "60px",
                        borderRadius: "16px",
                        marginTop: "20px",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "#594DA0",
                        },
                      }}
                      type="submit"
                      loading={isLoading}
                    >
                      Add
                    </LoadingButton>
                  </form>
                </>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Category;
