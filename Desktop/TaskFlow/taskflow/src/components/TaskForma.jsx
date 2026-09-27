import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import useTaskStore from "../store/useTaskStore";

const taskSchema = z.object({
  basliq: z
    .string()
    .trim()
    .min(
      3,
      "Başlıq ən azı 3 simvol olmalıdır"
    ),

  tesvir: z
    .string()
    .optional(),

  prioritet: z.enum([
    "asagi",
    "orta",
    "yuksek",
  ]),

  status: z.enum([
    "edilecek",
    "icrada",
    "bitdi",
  ]),
});

function TaskForma({ boardId }) {
  const addTask = useTaskStore(
    (state) => state.addTask
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      basliq: "",
      tesvir: "",
      prioritet: "orta",
      status: "edilecek",
    },
  });

  const onSubmit = (data) => {
    addTask({
      ...data,
      boardId,
    });

    reset();
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Yeni vəzifə</h2>

      <div className="form-group">
        <label htmlFor="basliq">
          Başlıq
        </label>

        <input
          id="basliq"
          type="text"
          placeholder="Vəzifənin başlığı"
          {...register("basliq")}
        />

        {errors.basliq && (
          <span className="error">
            {errors.basliq.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="tesvir">
          Təsvir
        </label>

        <textarea
          id="tesvir"
          rows="4"
          placeholder="Vəzifənin təsviri"
          {...register("tesvir")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="prioritet">
          Prioritet
        </label>

        <select
          id="prioritet"
          {...register("prioritet")}
        >
          <option value="asagi">
            Aşağı
          </option>

          <option value="orta">
            Orta
          </option>

          <option value="yuksek">
            Yüksək
          </option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">
          Status
        </label>

        <select
          id="status"
          {...register("status")}
        >
          <option value="edilecek">
            Ediləcək
          </option>

          <option value="icrada">
            İcrada
          </option>

          <option value="bitdi">
            Bitdi
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="primary-button"
      >
        Vəzifə əlavə et
      </button>
    </form>
  );
}

export default TaskForma;
