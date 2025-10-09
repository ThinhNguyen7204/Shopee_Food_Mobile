import RMain from "@/components/example/restaurant/main"
import { getRestaurantByIdAPI } from "@/utils/api"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Dimensions, Text, View } from "react-native"
import SkeletonProductId from "@/components/loading/skeleton.product.[id]";


const ProductPage = () => {
    const { id } = useLocalSearchParams()
    const [restaurant, setRestaurant] = useState<IRestaurant | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRestaurant = async () => {
            setIsLoading(true);
            const res = await getRestaurantByIdAPI(id as string)
            if (res.data) {
                setRestaurant(res.data)
            }
            setIsLoading(false);
        }

        fetchRestaurant()
    }, [id])
    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <SkeletonProductId />
            ) : (
                <RMain restaurant={restaurant} />
            )}
        </View>
    )
}

export default ProductPage