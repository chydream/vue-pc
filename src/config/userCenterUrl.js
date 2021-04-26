// 用户模块接口
export const user = {    
  getUsers: '/users', // 用户查询列表
  postUsers: '/users', // 新增用户信息
  patchUsers: '/users/{userId}', // 管理后台修改用户
  getUsersCurrent: '/users/current', // 根据access_token当前登录用户
  postUsersDelete: '/users/delete', // 删除用户信息
  postExportUser: '/users/exportUser', // 导出数据
  getUserLogin: '/users/login', // 根据用户名查询用户
  patchUsersMe: '/users/me', // 修改自己的个人信息
  putUsersPassword: '/users/password', // 修改密码
  getUsersEnabled: '/users/updateEnabled', // 修改用户状态
  getUsersId: '/users/{id}', // 根据用户ID查询用户信息
  putUsersPasswordAdmin: '/users/{id}/password', // 管理后台，给用户重置密码
  postUsersResetPassword: '/users/{id}/resetPassword', // 管理后台，给用户重置密码
  getUsersRoles: '/users/{id}/roles', // 获取用户的角色
  postUsersRoles: '/users/{id}/roles' // 管理后台给用户分配角色
}
// 用户模块接口权限
export const userPermission = {
  getUsers: 'user:get/users', // 用户查询列表
  postUsers: 'user:post/users', // 新增用户信息
  patchUsers: 'user:patch/users/{userId}', // 管理后台修改用户
  getUsersCurrent: 'user:get/users/current', // 根据access_token当前登录用户
  postUsersDelete: 'user:post/users/delete', // 删除用户信息
  postExportUser: 'user:post/users/exportUser', // 导出数据
  getUserLogin: 'user:get/users/login', // 根据用户名查询用户
  patchUsersMe: 'user:patch/users/me', // 修改自己的个人信息
  putUsersPassword: 'user:put/users/password', // 修改密码
  getUserEnabled: 'user:get/users/updateEnabled', // 修改用户状态
  getUsersId: 'user:get/users/{id}', // 根据用户ID查询用户信息
  putUsersPasswordAdmin: 'user:put/users/{id}/password', // 管理后台，给用户重置密码
  postUsersResetPassword: 'user:post/users/{id}/resetPassword', // 管理后台，给用户重置密码
  getUsersRoles: 'user:get/users/{id}/roles', // 获取用户的角色
  postUsersRoles: 'user:post/users/{id}/roles' // 管理后台给用户分配角色
}

// 租户模块接口
export const tenant = {
  getTenants: '/tenants', // 获取所有租户信息
  postTenants: '/tenants', // 保存租户
  patchTenants: '/tenants/{tenantId}', // 修改租户
  getCheckUniqueness: '/tenants/check_uniqueness', // 校验租户code|name是否重复
  postTenantsDelete: '/tenants/delete', // 根据租户ID批量删除
  getTenantspage: '/tenants/page', // 分页获取用户扩展信息
  getTenantsRole: '/tenants/role/{id}', // 根据角色获取租户信息
  getTenantsId: '/tenants/{id}' // 根据租户ID获取租户详细信息
}

// 租户模块接口权限
export const tenantPermission = {
  getTenants: 'tenant:get/tenants', // 获取所有租户信息
  postTenants: 'tenant:post/tenants', // 保存租户
  patchTenants: 'tenant:patch/tenants/{tenantId}', // 修改租户
  getCheckUniqueness: 'tenant:get/tenants/check_uniqueness', // 校验租户code|name是否重复
  postTenantsDelete: 'tenant:post/tenants/delete', // 根据租户ID批量删除
  getTenantspage: 'tenant:get/tenants/page', // 分页获取用户扩展信息
  getTenantsRole: 'tenant:get/tenants/role/{id}', // 根据角色获取租户信息
  getTenantsId: 'tenant:get/tenants/{id}' // 根据租户ID获取租户详细信息
}

// 角色模块接口
export const roles = {
  postRoles: '/roles', // 新增
  postRolesDelete: '/roles/deleteByIds', // 批量删除（根据id)
  getRoles: '/roles/actions/findAll', // 获取所有角色（不分页） 
  getRolesList: '/roles', // 分页查询
  getRoleById: '/users/{userId}/roles', // 根据用户id获取角色
  deleteRoles: '/roles/{id}', // 删除单个角色
  patchRoles: '/roles/{id}', // 更新
  getRolesDetail: '/roles/{roleId}' // 根据角色id获取角色详情
}

// 角色模块接口权限
export const rolesPermission = {
  postRoles: 'roles:post/roles', // 新增
  postRolesDelete: 'roles:post/roles/deleteByIds', // 批量删除（根据id)
  getRoles: 'roles:get/roles/actions/findAll', // 获取所有角色（不分页） 
  getRolesList: 'roles:get/roles', // 分页查询
  getRolesById: 'roles:get/users/{userId}/roles', // 根据用户id获取角色
  deleteRoles: 'roles:delete/roles/{id}', // 删除单个角色
  patchRoles: 'roles:patch/roles/{id}', // 更新
  getRolesDetail: 'roles:get/roles/{roleId}' // 根据角色id获取角色详情
}

// 权限接口
export const permissions = {
  postPermissions: '/permissions', // 新增权限
  postPermissionsDelete: '/permissions/deleteByIds', // 批量删除（根据id)
  getPermissionsAll: '/permissions', // 查所有权限（不分页） 
  getPermissionsByPage: '/permissions/findByPage', // 分页查询
  postRolePermission: '/permissions/rolePermission', // 分配权限
  getRolePermission: '/permissions/roles/{roleId}/permissions', // 获取角色对应的权限
  patchPermission: '/permissions/{id}', // 修改权限
  getPermissionsById: '/permissions/{id}' // 获取权限（通过权限id)
}

// 权限接口权限
export const permissionsPermission = {
  postPermissions: 'permissions:post/permissions', // 新增权限
  postPermissionsDelete: 'permissions:post/permissions/deleteByIds', // 批量删除（根据id)
  getPermissionsAll: 'permissions:get/permissions', // 查所有权限（不分页） 
  getPermissionsByPage: 'permissions:get/permissions/findByPage', // 分页查询
  postRolePermission: 'permissions:post/permissions/rolePermission', // 分配权限
  getRolePermission: 'permissions:get/permissions/roles/{roleId}/permissions', // 获取角色对应的权限
  patchPermission: 'permissions:patch/permissions/{id}', // 修改权限
  getPermissionsById: 'permissions:get/permissions/{id}' // 获取权限（通过权限id)
}

// 菜单接口
export const menus = {
  postMenus: '/menus', // 新增菜单
  postMenusDelete: '/menus/deleteByIds', // 批量删除（根据id)
  getMenusAll: '/menus', // 获取所有菜单
  postRoleMenus: '/menus/roleMenu', // 分配菜单
  getRoleMenus: '/roles/{roleId}/menus', // 获取指定角色的菜单
  getCurrentMenus: '/menus/userCenterMenu/{userId}', // 获取当前用户的菜单（应用系统为用户中心的菜单）
  patchMenus: '/menus/{id}', // 修改菜单
  getMenusById: '/menus/{id}' // 根据菜单id查询对应菜单
}

// 菜单接口权限
export const menuPermission = {
  postMenus: 'menus:post/menus', // 新增菜单
  postMenusDelete: 'menus:post/menus/deleteByIds', // 批量删除（根据id)
  getMenusAll: 'menus:get/menus', // 获取所有菜单
  postRoleMenus: 'menus:post/menus/roleMenu', // 分配菜单
  getRoleMenus: 'menus:get/roles/{roleId}/menus', // 获取指定角色的菜单
  getCurrentMenus: 'menus:get/menus/userCenterMenu/{userId}', // 获取当前用户的菜单（应用系统为用户中心的菜单）
  patchMenus: 'menus:patch/menus/{id}', // 修改菜单
  getMenusById: 'menus:get/menus/{id}' // 根据菜单id查询对应菜单
}

// 应用系统接口
export const appsystems = {
  postAppsystems: '/appsystems', // 新增
  postAppsystemsDelete: '/appsystems/deleteByIds', // 批量删除（根据id)
  getAppsystemsAll: '/appsystems/findAll', // 获取所有应用系统
  getAppsystemsByPage: '/appsystems', // 获取所有应用系统（分页查询）
  patchAppsystems: '/appsystems/{id}', // 更新
  getAppsystemsById: '/appsystems/{id}', // 根据id获取指定应用系统
  deleteAppsystemsById: '/appsystems/{id}' // 删除单个
}

// 应用系统接口权限
export const appsystemsPermission = {
  postAppsystems: 'appsystems:post/appsystems', // 新增
  postAppsystemsDelete: 'appsystems:post/appsystems/deleteByIds', // 批量删除（根据id)
  getAppsystemsAll: 'appsystems:get/appsystems/findAll', // 获取所有应用系统
  getAppsystemsByPage: 'appsystems:get/appsystems', // 获取所有应用系统（分页查询）
  patchAppsystems: 'appsystems:patch/appsystems/{id}', // 更新
  getAppsystemsById: 'appsystems:get/appsystems/{id}', // 根据id获取指定应用系统
  deleteAppsystemsById: 'appsystems:delete/appsystems/{id}' // 删除单个
}

// 应用接口
export const clients = {
  getClients: '/clients', // 应用列表
  getAllClients: '/clients/all', // 所有应用
  postEditClients: '/clients/saveOrUpdate', // 保存或者修改应用
  putClientsEnabled: '/clients/updateEnabled', // 修改状态
  getClientsById: '/clients/{id}', // 根据id获取应用
  deleteClients: '/clients/{id}' // 删除应用
}

// 应用接口权限
export const clientsPermission = {
  getClients: 'clients:get/clients', // 应用列表
  getAllClients: 'clients:get/clients/all', // 所有应用
  postEditClients: 'clients:post/clients/saveOrUpdate', // 保存或者修改应用
  putClientsEnabled: 'clients:put/clients/updateEnabled', // 修改状态
  getClientsById: 'clients:get/clients/{id}', // 根据id获取应用
  deleteClients: 'clients:delete/clients/{id}' // 删除应用
}

// 服务接口
export const services = {
  getServicesAll: '/services/findAlls', // 查询所有服务
  getServicesOne: '/services/findOnes', // 获取服务以及顶级服务
  postServices: '/services/granted', // setMenuToClient
  postServicesEdit: '/services/saveOrUpdate', // 新增服务
  getServicesById: '/services/{clientId}/services', // 根据clientId获取对应的服务
  deleteServices: '/services/{id}' // 删除服务
}

// 服务接口权限
export const servicesPermission = {
  getServicesAll: 'services:get/services/findAlls', // 查询所有服务
  getServicesOne: 'services:get/services/findOnes', // 获取服务以及顶级服务
  postServices: 'services:post/services/granted', // setMenuToClient
  postServicesEdit: 'services:post/services/saveOrUpdate', // 新增服务
  getServicesById: 'services:get/services/{clientId}/services', // 根据clientId获取对应的服务
  deleteServices: 'services:delete/services/{id}' // 删除服务
}
