import { useSelector } from "react-redux";

// export const usePermissionHandler = () => {
//     const [permissionsValue,setPermissionsValue] = useState('')
//   const permissionsData = useSelector((state) => state?.Permissions);
//   console.log("permissionsData in utils", permissionsData);

//     if (permissionsData.user_type == "admin") {
//       return true;
//     } else {
//       const status = permissionsData?.user_permissions?.some(
//         (item) => item?.codename == permissionsValue
//       );
//       console.log("status", status);
//       return status;
//     }
//   return setPermissionsValue

// };

import { useState, useEffect } from "react";

const usePermission = (permissionName) => {
  const [hasPermission, setHasPermission] = useState(false);
  const permissionsData = useSelector((state) => state?.Permissions);

  useEffect(() => {
    if (permissionsData.user_type == "admin") {
      setHasPermission(true);
    } else {
      const permission = permissionsData?.user_permissions.find(
        (perm) => perm.codename === permissionName
      );
      if (permission) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    }
  }, [permissionName, permissionsData?.user_permissions]);

  return hasPermission;
};

export default usePermission;
