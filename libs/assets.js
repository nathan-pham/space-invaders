export const load = async (...paths) => {
    const download = (path) => (new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = () => {
            console.log("downloaded", path)
            resolve(image)
        }

        image.onerror = () => {
            console.log("failed to download", path)
            reject("error loading assets")
        }

        image.src = path
    }))

    const assets = (await Promise.all(paths.map(download))).reduce((acc, cur, i) => ({
        ...acc,
        [paths[i]]: cur
    }), {})

    return assets
}