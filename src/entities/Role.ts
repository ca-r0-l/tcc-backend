enum Role {
    ADMIN, COMMON
}

function getRole(role: number): Role {
    if (role === 0) return Role.ADMIN;
    if (role === 1) return Role.COMMON;
}

function verifyRoleIsCorrect(role: string): boolean {
    if (role === Role.ADMIN.toString()) return true;
    if (role === Role.COMMON.toString()) return true;
    return false;
}

export {
    Role,
    getRole,
    verifyRoleIsCorrect
}
