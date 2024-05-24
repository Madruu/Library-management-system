import finesService from '../services/finesService.js';

const createFine = async (req, res) => {
    const result = await finesService.createFine();

    return res.status(200).json(result);
}

const checkFines = async (req, res) => {
    try{
        const userId = req.body.num_matricula;

        const result = await finesService.checkFines(userId);

        if(result.error) return res.status(result.status).json(result.message);

        res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export default { createFine, checkFines };

