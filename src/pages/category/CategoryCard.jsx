import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Air from "../../assets/images/air.svg";
import Bath from "../../assets/images/bathroom.svg";
import Brick from "../../assets/images/brick.svg";
import Damp from "../../assets/images/damp.svg";
import Clear from "../../assets/images/clearance.svg";
import Dor from "../../assets/images/door.svg";
import Floor from "../../assets/images/floor.svg";
import Garage from "../../assets/images/garage.svg";
import Garden from "../../assets/images/garden.svg";
import Cylnder from "../../assets/images/cylinder.svg";
import HandMnan from "../../assets/images/handyman.svg";
import Kitchen from "../../assets/images/kitchen.svg";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import ListItemIcon from "@mui/material/ListItemIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DeleteOutline, EditOutlined, Tune } from "@mui/icons-material";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import Paint from "../../assets/images/paint.png";
import {
  useCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/services/category.service";
import CustomFileUpload from "../../components/common/customFileUpload/CustomeFileUpload";
import { categorySchema } from "../../validations/category/category";
import { toast } from "react-hot-toast";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";
import usePermission from "../../utils/permissionHandler/PermissionHandler";
import SearchBar from "../../components/common/searchbar/SearchBar";

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

const CategoryCard = () => {
  const [searchquery, setsearchquery] = useState("");
  const canUpdateOccupation = usePermission("change_occupation");
  const canDeleteOccupation = usePermission("delete_occupation");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const { data, isLoading: CatisLoading } = useCategoryQuery({
    page,
    search: searchquery,
  });
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [image, setImage] = useState("");

  useEffect(() => {
    let count = data?.count;

    setCount(Math.ceil(count / 9));
    // console.log("count", Math.ceil(count / 10));
  }, [JSON.stringify(data?.results)]);

  const onSubmit = async (values) => {
    // console.log("form valuesss upd", values);
    const keysData = Object.keys(values);
    // console.log("keysData", keysData);
    let valuesToSend = {};
    keysData.forEach((item) => {
      if (values[item] !== editCategoryData[item]) {
        valuesToSend[item] = values[item];
      }
    });
    // console.log("valuesToSend", valuesToSend, image);
    const formdata = new FormData();
    if (valuesToSend?.name) {
      formdata.append("name", valuesToSend.name);
    }
    if (image !== editCategoryData.image) {
      formdata.append("image", image);
    }
    // console.log("formdata", ...formdata);
    const res = await updateCategory([formdata, editCategoryData.id]);
    // console.log("res", res?.error);
    if (res?.data?.message) {
      setEditModal(false);
      toast.success(res?.data?.message);
    }
    if (res?.error) {
      setEditModal(false);
      toast.error(res?.error?.data?.invalid_params[0]?.reason);
    }
  };
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const MenuOpen = (event, data) => {
    // console.log("data", data);
    setAnchorEl(event.currentTarget);
    setEditCategoryData(data);
  };
  // console.log("editCategoryData", editCategoryData);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const EditBoxOpen = () => {
    setAnchorEl(null);
    setEditModal(true);
  };
  const handleEditClose = () => {
    setEditModal(false);
  };
  const DeleteBoxOpen = () => {
    setAnchorEl(null);
    setDelModal(true);
  };
  const handleCloseDelBox = () => {
    setDelModal(false);
  };

  const initialValues = {
    name: editCategoryData?.name,
    image: editCategoryData?.image,
  };
  const delObject = async (id) => {
    const res = await deleteCategory({ id: editCategoryData?.id });
    if (res?.data?.data?.response_message) {
      setDelModal(false);
      toast.success(res?.data?.data?.response_message);
    }
    if (res?.error) {
      setDelModal(false);
      toast.error(res?.error?.data?.message);
    }
  };

  // console.log("data?.results",data?.results)

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (query) => {
    if (query) {
      setPage(1);
      setsearchquery(query);
    } else {
      setsearchquery("");
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="start"
        // alignItems="stretch"
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={12} xl={12} lg={12}>
          <Box
            className="searchbar_main"
            sx={{ marginBottom: "20px", marginRight: "20px" }}
          >
            <SearchBar
              onSearch={handleSearch}
              TooltipText="Search by : Category Name"
            />
          </Box>
        </Grid>
      </Grid>

      {CatisLoading && (
        <p style={{ textAlign: "center", fontWeight: 500 }}>Loading...</p>
      )}
      <Grid
        container
        justifyContent="start"
        // alignItems="stretch"
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {!CatisLoading && data && data?.results?.length > 0 ? (
          data?.results?.map((item) => (
            <>
              <Grid item xs={8} md={5} xl={4} lg={4}>
                <Card
                  sx={{
                    width: "90%",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    border: "2px solid #DDDDDD",
                  }}
                >
                  <CardHeader
                    sx={{ alignSelf: "end" }}
                    action={
                      <IconButton
                        onClick={(e) => MenuOpen(e, item)}
                        aria-label="settings"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                  <CardMedia
                    component="img"
                    src={item.image}
                    sx={{
                      // width: "100px",
                      objectFit: "contain",
                      width: "100%",
                      height: "100px",
                    }}
                  />
                  <CardContent
                    sx={{
                      backgroundColor: "#F7F6FE",
                      width: "100%",
                      // position: "relative",
                      // botton: 0,
                      // height: "71px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "24px",
                        lineHeight: "24px",
                        textAlign: "center",
                        color: "#9277F7",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    border: "1px solid #DDDDDD",
                    boxShadow: "-2px 2px 8px rgba(0, 0, 0, 0.15",
                    width: "70px",
                    borderRadius: "16px",
                    // marginLeft: "10px",
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {canUpdateOccupation && (
                  <MenuItem onClick={EditBoxOpen}>
                    <ListItemIcon
                      sx={{
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "22.4px",
                        color: "#000000",
                      }}
                    >
                      <EditOutlined sx={{ color: "#594DA0" }} />
                      Edit
                    </ListItemIcon>
                  </MenuItem>
                )}
                {canDeleteOccupation && (
                  <MenuItem onClick={DeleteBoxOpen}>
                    <ListItemIcon
                      sx={{
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "22.4px",
                        color: "#000000",
                      }}
                    >
                      <DeleteOutline sx={{ color: "#594DA0" }} />
                      Delete
                    </ListItemIcon>
                  </MenuItem>
                )}
              </Menu>
            </>
          ))
        ) : (
          <>{!CatisLoading && <Typography>No data found</Typography>}</>
        )}
      </Grid>

      {data?.results.length > 0 && (
        <Box
          sx={{ width: "100%", justifyContent: "end", display: "flex", mt: 2 }}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            marginTop="56px"
            marginBottom="20px"
            alignItems="center"
          >
            <Typography
              sx={{
                color: "#04111D",
                fontWeight: "700",
                fontSize: "20px",
                lineHeight: "20px",
              }}
            >
              Page :
            </Typography>
            {/* {console.log("pagination resonse", data?.count)} */}
            <Pagination
              count={count}
              page={page}
              variant="rounded"
              onChange={handleChange}
              renderItem={(item) => (
                <PaginationItem
                  sx={{ color: "#000000" }}
                  slots={{ previous: ArrowLeftIcon, next: ArrowRightIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </Box>
      )}

      <Modal
        open={editModal}
        onClose={handleEditClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "571px", borderRadius: "16px" }}>
          <IconButton
            onClick={handleEditClose}
            aria-label="settings"
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#594DA0",
            }}
          >
            <CancelIcon />
          </IconButton>
          <Typography
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "64px",
              color: "#594DA0",
            }}
          >
            Edit Category
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={categorySchema}
          >
            {({ errors, handleSubmit, values, handleChange, touched }) => {
              return (
                <>
                  <form onSubmit={handleSubmit}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "24px",
                        lineHeight: "24px",
                        marginTop: "28px",
                      }}
                    >
                      Change Category Name:
                    </Typography>
                    <CssTextField
                      placeholder="Bathroom Fitting"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      sx={{
                        // width: { xs: "100%", sm: "491px" },
                        width: "100%",
                        height: "60px",
                        marginTop: "10px",
                      }}
                    />
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
                      editData={values.image}
                    />
                    <LoadingButton
                      variant="contained"
                      sx={{
                        backgroundColor: "##9277F7",
                        // width: { xs: "100%", sm: "491px" },
                        width: "100%",
                        height: "60px",
                        borderRadius: "16px",
                        textTransform: "capitalize",
                        marginTop: "20px",
                        "&:hover": {
                          backgroundColor: "#9277F7",
                        },
                      }}
                      type="submit"
                      loading={isLoading}
                    >
                      Change
                    </LoadingButton>
                  </form>
                </>
              );
            }}
          </Formik>
        </Box>
      </Modal>
      <Modal
        open={delModal}
        onClose={handleCloseDelBox}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: { xs: "100%", sm: "571px" },
            borderRadius: "16px",
          }}
        >
          <IconButton
            onClick={handleCloseDelBox}
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
            sx={{
              fontWeight: "700",
              fontSize: "40px",
              lineHeight: "64px",
              textAlign: "center",
              color: "#594DA0",
            }}
          >
            Delete Category
          </Typography>

          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "24px",
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            You want to delete this category,
            <br /> are you sure?
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "230px",
                height: "56px",
                borderRadius: "16px",
                textTransform: "capitalize",
              }}
              onClick={() => setDelModal(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              sx={{
                width: "230px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#D9574C",
                "&:hover": {
                  backgroundColor: "#D9574C",
                },
                textTransform: "capitalize",
              }}
              onClick={() => delObject(editCategoryData?.id)}
            >
              Delete
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default CategoryCard;
