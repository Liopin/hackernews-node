function feed(parent, args, context, info){
    return context.prisma.links()
}

module.exporst = {
    feed,
}