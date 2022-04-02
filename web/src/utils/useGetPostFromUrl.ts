import { usePostQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
    const router = useRouter();
    const intId = useGetIntId();
    return usePostQuery({
        pause: intId === 1,
        variables: { id: intId },
    });
};
