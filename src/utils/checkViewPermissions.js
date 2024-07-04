export const checkViewPermission = (pathname, allowedPermissions) => {
  // console.log(
  //   "🚀 ~ file: checkViewPermissions.js:2 ~ checkViewPermission ~ allowedPermissions:",
  //   allowedPermissions
  // );

  let code_name = "";

  if (pathname.startsWith("/editcustomer/")) {
    code_name = "view_customer";
  } else if (pathname.startsWith("/edituser/")) {
    code_name = "view_staff";
  } else if (pathname.startsWith("/viewprofile/")) {
    code_name = "view_staff";
  } else if (pathname.startsWith("/updaterole/")) {
    code_name = "view_group";
  } else if (pathname.startsWith("/updatetop/")) {
    code_name = "view_topupcode";
  } else if (pathname.startsWith("/skillprofile/")) {
    code_name = "view_skilledworker";
  } else if (pathname.startsWith("/edit-skilled-worker/")) {
    code_name = "view_skilledworker";
  } else if (pathname.startsWith("/customerdetails/")) {
    code_name = "view_customer";
  } else if (pathname.startsWith("/update-withdrawal/")) {
    code_name = "change_withdrawal";
  } else if (pathname.startsWith("/contact-us")) {
    code_name = "view_contactus";
  } else if (pathname.startsWith("/dispute")) {
    code_name = "view_dispute";
  } else if (pathname.startsWith("/withdrawal-audit")) {
    code_name = "view_topup";
  } else if (pathname.startsWith("/withdrawal-staff")) {
    code_name = "view_topup";
  } else if (pathname.startsWith("/withdrawal-skilled-worker")) {
    code_name = "view_topup";
  } else {
    switch (pathname) {
      case "/category":
        code_name = "view_occupation";
        break;
      case "/customer":
        code_name = "view_customer";
        break;
      case "/customercreate":
        code_name = "view_customer";
        break;
      case "/createRole":
        code_name = "view_group";
        break;
      case "/editcustomer/:id":
        code_name = "view_customer";
        break;
      case "/manage":
        code_name = "delete_group";
        break;
      case "/role":
        code_name = "view_group";
        break;

      case "/skill":
        code_name = "view_skilledworker";
        break;
      case "/skilled-worker":
        code_name = "view_skilledworker";
        break;
      case "/staff":
        code_name = "view_staff";
        break;
      case "/createuser":
        code_name = "view_staff";
        break;
      case "/topup":
        code_name = "view_topupcode";
        break;
      case "/audit":
        code_name = "view_topupcode";
        break;
      case "/withdraw":
        code_name = "view_withdrawal";
        break;
      // case "/contact-us":
      //   code_name = "view_contactus";
      //   break;
      case "/":
        code_name = "view_user";
        break;

      default:
        break;
    }
  }

  let allowed = false;

  for (let i = 0; i < allowedPermissions?.length; i++) {
    if (allowedPermissions?.[i]?.codename == code_name) {
      // console.log("ISALLOWED ==>ALLOWED", allowedPermissions[i]?.codename);
      allowed = true;
      break;
    } else {
      // console.log("ISALLOWED ==>NOT ALLOWED");
      allowed = false;
    }
  }
  return allowed;
};
