export const userIDQueryMiddleware = async (resolve, source, args, context, info) => {
    if (context?.user) {
        const newArgs = {
            ...args, filter: {
                ...args.filter,
                _id: context?.user._id
            }
        }
        return resolve(source, newArgs, context, info);
    }
    throw new Error('You must be authorized');
}

export const needPermission = async (resolve, source, args, context, info) => {
    if (context?.user) {
        return resolve(source, args, context, info);
    }
    throw new Error("You need to Login")
}

export const adminPermission = async (resolve, source, args, context, info) => {
    if ((context?.user?.type ?? "Customer") === "Admin") {
        return resolve(source, args, context, info)
    }
    throw new Error('You must be Admin Only');
}

export default userIDQueryMiddleware