// js/sorting.js

export const filterUsersByDept = (users, department) => {
    if (department === 'all') {
        return users;
    }
    return users.filter(user => user.department === department);
};

export const sortUsersByName = (users, direction = 'asc') => {
    return users.sort((a, b) => {
        if (direction === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
};