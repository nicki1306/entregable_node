class collectionManager {
    constructor(collection) {
        this.collection = collection
    }
}

getAll = async (limit) => {
    const all = await this.collection.find({})
    return all
}

add = async (product) => {
    const newProduct = await this.collection.create(product)
    return newProduct
}

getById = async (id) => {
    const product = await this.collection.findById(id)
    return product
}

update = async (id, product) => {
    const updatedProduct = await this.collection.findByIdAndUpdate(id, product)
    return updatedProduct
}

deleted = async (id) => {
    const deletedProduct = await this.collection.findByIdAndDelete(id)
    return deletedProduct
}


