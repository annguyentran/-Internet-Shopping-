const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(tags); 
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if(!tag){
      res.status(404).json({message:"TAG NOT FOUND"})
      return
    }
     res.status(200).json(tag)
  } catch (err) { 
    res.status(400).json(err); 
  }
});

router.post('/', async (req, res) => {
  // create a new tag

  try{
    const createTag = await Tag.create(req.body)
    res.status(200).json(createTag);

  } catch (err) { 
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tag = await Tag.update(req.body,{
      where:{id:req.params.id}
    })
    if(!tag[0]){
      res.status(404).json({message:'Error updating tag'})
      return
    }
    res.status(200).json(tag)
  } catch (err) { 
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tag = await Tag.destroy({
      where: {id: req.params.id},
    })
    if(!tag){
      res.status(404).json({message:"Could not find tag to delete"})
      return
    } 
    res.status(200).json(tag)
  }catch (err) { 
    res.status(400).json(err);
  }
});

module.exports = router;
