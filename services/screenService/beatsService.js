import {getUserBeats} from "../apiServices/userApiService.js";


export const loadBeats = async (currentPage, setBeats, setHasMore, setLoading) => {
    setLoading(true);
    try {
        const isConnected = await checkInternetConnection();
        if (!isConnected) {
            setLoading(false);
            return;
        }
        const data = await getUserBeats(currentPage);
        if (data && data.beats && data.beats.length > 0) {
            if (currentPage === 1) {
                setBeats(data.beats); // Для первой страницы заменяем весь список битов
            } else {
                setBeats(prevBeats => [...prevBeats, ...data.beats]); // Для последующих страниц добавляем новые элементы
            }

            // Проверяем, есть ли еще страницы для загрузки
            setHasMore(data.beats.length > 0);
        } else {
            setHasMore(false); // Если данных нет, блокируем подгрузку
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};

// Функция для проверки интернет-соединения
const checkInternetConnection = async () => {
    try {
        const response = await fetch("https://www.google.com", {
            method: "HEAD",
            timeout: 3000,
        });
        return response.ok;
    } catch (error) {
        console.error("Ошибка проверки соединения:", error);
        return false;
    }
};




